#!/usr/bin/env bash
# Create and update the Scaleway resources of www.dokos.io, one step at a time.
# Same layout as doc.dokos.io (gitlab.com/dokos/documentation, infra/scaleway/), in the same
# Scaleway project ("documentation"), which already has the Edge Services plan.
#
#   infra/scaleway/setup.sh <step> [--yes]
#
# Steps, in order (each one can run again: it reuses what already exists):
#   status     read-only: show every resource and its state
#   registry   private Container Registry namespace
#   iam        IAM application, policy and API key for CI
#   push       build the Docker image from .output/ and push it, tagged with the commit
#   container  Serverless Container namespace and container, running the pushed image
#   edge       Edge Services pipeline in front of the container (default *.svc.edge.scw.cloud host)
#   domain     add www.dokos.io to the pipeline (cutover: the CNAME must point to the pipeline)
#   lb         Load Balancer for the apex dokos.io: 301 to https://www.dokos.io, keeping the path
#   lb-cert    Let's Encrypt certificate and HTTPS frontend for dokos.io (cutover: the A record
#              must point to the Load Balancer IP)
#   purge      empty the Edge cache
#
# Resource IDs are saved in infra/scaleway/resources.env, on this machine only: the repository is
# public, so the file is ignored by git (see resources.env.example). Start it with the project:
#   echo PROJECT_ID=<id of the Scaleway project "documentation"> > infra/scaleway/resources.env
# Secrets are saved in ~/.config/dokos-website/ with mode 600, never in the repository.
# Needs: scw (configured), jq, docker, git.

set -euo pipefail

STEP="${1:-status}"
YES="${2:-}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="${SITE_REPO:-$(cd "$HERE/../.." && pwd)}"   # override with SITE_REPO=/path/to/repo
STATE="$HERE/resources.env"
SECRETS_DIR="$HOME/.config/dokos-website"
GITLAB_PROJECT="dokos/website"

# --- Settings ----------------------------------------------------------------------------
REGION="fr-par"
ZONE="fr-par-1"                                       # Load Balancer
NAME="dokos-website"                                  # registry, namespace, container, pipeline, LB
DOMAIN="www.dokos.io"
APEX="dokos.io"
CONTAINER_CPU=500                                     # mvCPU: prerendered pages, Edge caches the rest
CONTAINER_MEMORY=1GB                                  # the CLI wants a G or GB unit
CONTAINER_MIN_SCALE=1                                 # 1: no cold start on a cache miss
CONTAINER_MAX_SCALE=3
CONTAINER_TIMEOUT=30s
EDGE_FALLBACK_TTL=3600s                               # only for responses without Cache-Control
LB_TYPE="LB-S"
# Probes: up to 5 min to start (10 s x 30), restart after 3 failed health checks 30 s apart.

# --- Helpers -----------------------------------------------------------------------------
[[ -f "$STATE" ]] && source "$STATE"
: "${PROJECT_ID:?Set PROJECT_ID in $STATE (see the header of this script).}"
scwj() { scw "$@" -o json; }
save() {   # save KEY=VALUE in resources.env
  [[ -n "$2" && "$2" != "null" ]] || { echo "No value for $1: the previous command failed. Run the step again."; exit 1; }
  touch "$STATE"
  grep -v "^$1=" "$STATE" > "$STATE.tmp" || true
  echo "$1=$2" >> "$STATE.tmp"
  sort "$STATE.tmp" > "$STATE" && rm "$STATE.tmp"
  printf -v "$1" '%s' "$2"
  echo "  saved $1=$2"
}
confirm() {
  echo "$1"
  [[ "$YES" == "--yes" ]] && return 0
  [[ -t 0 ]] || { echo "No terminal to answer: run again with --yes to confirm."; exit 1; }
  read -r -p "Continue? [y/N] " answer
  [[ "$answer" == [yY] ]] || { echo "Stopped."; exit 1; }
}
image_tag() { git -C "$REPO" rev-parse HEAD | cut -c1-12; }   # same tag as deploy.sh
image_ref() { echo "rg.$REGION.scw.cloud/$NAME/site:$(image_tag)"; }

# --- Steps -------------------------------------------------------------------------------
step_status() {
  echo "Project $PROJECT_ID ($REGION)"
  echo "-- Registry";                scw registry namespace list project-id="$PROJECT_ID" region="$REGION" name="$NAME" || echo "  (request failed)"
  echo "-- Images";                  [[ -n "${REGISTRY_ID:-}" ]] && scw registry image list namespace-id="$REGISTRY_ID" region="$REGION" || echo "  none"
  echo "-- Containers";              scw container container list project-id="$PROJECT_ID" region="$REGION" name="$NAME" || echo "  (request failed)"
  echo "-- Edge pipelines";          scw edge-services pipeline list project-id="$PROJECT_ID" || echo "  (request failed)"
  echo "-- IAM applications";        scw iam application list name="$NAME-ci" 2>/dev/null || true
  echo "-- Load Balancer";           scw lb lb list zone="$ZONE" project-id="$PROJECT_ID" name="$NAME" || echo "  (request failed)"
  [[ -n "${DNS_STAGE_ID:-}" ]] && { echo "-- Edge endpoint"; scw edge-services dns-stage get "$DNS_STAGE_ID" || true; }
  [[ -n "${LB_IP:-}" ]] && echo "-- Apex: $APEX A $LB_IP"
  return 0
}

step_registry() {
  local id
  id=$(scwj registry namespace list project-id="$PROJECT_ID" region="$REGION" name="$NAME" | jq -r '.[0].id // empty')
  if [[ -z "$id" ]]; then
    confirm "Create the private registry namespace '$NAME'."
    id=$(scwj registry namespace create name="$NAME" project-id="$PROJECT_ID" region="$REGION" is-public=false \
      description="Docker images of www.dokos.io" | jq -r '.id')
  fi
  save REGISTRY_ID "$id"
}

# One IAM application for CI: push images, update the container, purge the Edge cache. Its own
# key, apart from the docs' key, so that revoking one does not stop the other's deploys.
step_iam() {
  local name="$NAME-ci" id file="$SECRETS_DIR/ci.env"
  id=$(scwj iam application list name="$name" | jq -r --arg n "$name" '.[] | select(.name == $n) | .id' | head -1)
  if [[ -z "$id" ]]; then
    confirm "Create the IAM application '$name', its policy (project $PROJECT_ID only) and one API key."
    id=$(scwj iam application create name="$name" description="GitLab CI deploy of www.dokos.io" | jq -r '.id')
    scw iam policy create name="$name" application-id="$id" rules.0.project-ids.0="$PROJECT_ID" \
      rules.0.permission-set-names.0=ContainerRegistryFullAccess \
      rules.0.permission-set-names.1=ContainersFullAccess \
      rules.0.permission-set-names.2=EdgeServicesFullAccess >/dev/null
  fi
  save IAM_CI_APP_ID "$id"
  if [[ -f "$file" ]]; then
    echo "  $file exists, key kept"
  else
    mkdir -p "$SECRETS_DIR" && chmod 700 "$SECRETS_DIR"
    scwj iam api-key create application-id="$id" default-project-id="$PROJECT_ID" description="$name" \
      | jq -r '"SCW_ACCESS_KEY=\(.access_key)\nSCW_SECRET_KEY=\(.secret_key)"' > "$file"
    chmod 600 "$file"
    echo "  key written to $file"
  fi
  echo
  echo "Add the CI key to GitLab (masked, protected):"
  echo "  source $file"
  echo "  glab variable set SCW_ACCESS_KEY \"\$SCW_ACCESS_KEY\" -R $GITLAB_PROJECT --masked --protected"
  echo "  glab variable set SCW_SECRET_KEY \"\$SCW_SECRET_KEY\" -R $GITLAB_PROJECT --masked --protected"
  echo "  glab variable set SCW_DEFAULT_PROJECT_ID $PROJECT_ID -R $GITLAB_PROJECT"
}

step_push() {
  [[ -n "${REGISTRY_ID:-}" ]] || { echo "Run the registry step first."; exit 1; }
  [[ -f "$SECRETS_DIR/ci.env" ]] || { echo "Run the iam step first."; exit 1; }
  confirm "Build and push $(image_ref) (from .output/ of commit $(image_tag)) with the CI key."
  # Same code as the GitLab CI job. docker keeps the CI key (not a personal one) in ~/.docker/config.json.
  (set -a; source "$SECRETS_DIR/ci.env"; set +a; SITE_REPO="$REPO" bash "$HERE/deploy.sh" image)
  save LAST_IMAGE "$(image_ref)"
}

step_container() {
  [[ -n "${LAST_IMAGE:-}" ]] || { echo "Run the push step first."; exit 1; }
  local ns id
  ns=$(scwj container namespace list project-id="$PROJECT_ID" region="$REGION" name="$NAME" | jq -r '.[0].id // empty')
  if [[ -z "$ns" ]]; then
    confirm "Create the container namespace '$NAME'."
    ns=$(scwj container namespace create name="$NAME" project-id="$PROJECT_ID" region="$REGION" | jq -r '.id')
  fi
  save CONTAINER_NAMESPACE_ID "$ns"
  # A new namespace stays in "creating" for a while, and a container cannot be created in it until then.
  local i
  for i in $(seq 1 40); do
    [[ "$(scwj container namespace get "$ns" region="$REGION" | jq -r '.status')" == "ready" ]] && break
    echo "  namespace: not ready yet"; sleep 5
  done

  id=$(scwj container container list namespace-id="$ns" region="$REGION" name="$NAME" | jq -r '.[0].id // empty')
  if [[ -z "$id" ]]; then
    confirm "Create the container '$NAME' from $LAST_IMAGE: ${CONTAINER_CPU} mvCPU, $CONTAINER_MEMORY, scale $CONTAINER_MIN_SCALE-$CONTAINER_MAX_SCALE, timeout $CONTAINER_TIMEOUT. min-scale 1 is billed all the time."
    id=$(scwj container container create namespace-id="$ns" region="$REGION" name="$NAME" image="$LAST_IMAGE" \
      port=8080 privacy=public https-connections-only=true \
      mvcpu-limit="$CONTAINER_CPU" memory-limit-bytes="$CONTAINER_MEMORY" \
      min-scale="$CONTAINER_MIN_SCALE" max-scale="$CONTAINER_MAX_SCALE" timeout="$CONTAINER_TIMEOUT" \
      startup-probe.http.path=/fr startup-probe.interval=10s startup-probe.timeout=5s startup-probe.failure-threshold=30 \
      liveness-probe.http.path=/fr liveness-probe.interval=30s liveness-probe.timeout=5s liveness-probe.failure-threshold=3 \
      | jq -r '.id')
  else
    confirm "Deploy $LAST_IMAGE to the existing container $id."
    scw container container update "$id" region="$REGION" image="$LAST_IMAGE" >/dev/null
  fi
  save CONTAINER_ID "$id"
  echo "CI deploys need it: glab variable set SCW_SITE_CONTAINER_ID $id -R $GITLAB_PROJECT --protected"
  echo "Container endpoint: https://$(scwj container container get "$id" region="$REGION" | jq -r '.public_endpoint // .domain_name' | sed 's|^https://||')"
}

# The ID of the first stage of a type in the pipeline, or nothing. A create that timed out may
# still have created the stage, so each one is looked up before it is created again.
# A failed lookup is retried, never read as "not found", which would create a duplicate.
edge_stage() {
  local out i
  for i in 1 2 3 4 5; do
    out=$(scwj edge-services "$1" list pipeline-id="$PIPELINE_ID" 2>/dev/null) && { jq -r '.[0].id // empty' <<<"$out"; return; }
    sleep 10
  done
  echo "Edge Services does not answer (listing $1). Run the step again later." >&2
  exit 1
}
retry() { local i; for i in 1 2 3; do "$@" && return 0; echo "  retry $i: $1 ${2:-}" >&2; sleep 10; done; return 1; }
ensure_stage() {   # KEY stage-type create-args...
  local key="$1" type="$2"; shift 2
  [[ -n "${!key:-}" ]] && return
  local id attempt
  for attempt in 1 2 3; do
    id=$(edge_stage "$type")
    [[ -n "$id" ]] && break
    scwj edge-services "$type" create pipeline-id="$PIPELINE_ID" "$@" >/dev/null || { echo "  $type: attempt $attempt failed" >&2; sleep 15; }
  done
  [[ -n "$id" ]] || id=$(edge_stage "$type")
  save "$key" "$id"
}
step_edge() {
  [[ -n "${CONTAINER_ID:-}" ]] || { echo "Run the container step first."; exit 1; }
  if [[ -z "${PIPELINE_ID:-}" ]]; then
    confirm "Create the Edge Services pipeline '$NAME': DNS -> TLS (Let's Encrypt) -> cache -> container. A second pipeline on the project's plan is billed as overage."
    save PIPELINE_ID "$(scwj edge-services pipeline create name="$NAME" project-id="$PROJECT_ID" description="www.dokos.io" | jq -r '.id')"
  fi
  ensure_stage BACKEND_STAGE_ID backend-stage \
    scaleway-serverless-container.region="$REGION" scaleway-serverless-container.container-id="$CONTAINER_ID"
  # The server sends Cache-Control on every response; the fallback TTL only covers the others.
  ensure_stage CACHE_STAGE_ID cache-stage backend-stage-id="$BACKEND_STAGE_ID" fallback-ttl="$EDGE_FALLBACK_TTL" include-cookies=false
  ensure_stage TLS_STAGE_ID tls-stage managed-certificate=true cache-stage-id="$CACHE_STAGE_ID"
  ensure_stage DNS_STAGE_ID dns-stage tls-stage-id="$TLS_STAGE_ID"
  if [[ "$(scwj edge-services pipeline get "$PIPELINE_ID" | jq -r '[.errors[]? | select(.code == "pipeline_missing_head_stage")] | length')" != "0" ]]; then
    retry scw edge-services pipeline set-head "$PIPELINE_ID" add-new-head-stage.new-stage-id="$DNS_STAGE_ID" >/dev/null
  fi
  echo "Edge endpoint: https://$(scwj edge-services dns-stage get "$DNS_STAGE_ID" | jq -r '.default_fqdn')"
  echo "Compare it with production: node scripts/compare-hosts.mjs https://$DOMAIN https://<endpoint>"
  echo "CI deploys need it: glab variable set SCW_SITE_PIPELINE_ID $PIPELINE_ID -R $GITLAB_PROJECT --protected"
}

step_domain() {
  [[ -n "${DNS_STAGE_ID:-}" ]] || { echo "Run the edge step first."; exit 1; }
  local endpoint; endpoint=$(scwj edge-services dns-stage get "$DNS_STAGE_ID" | jq -r '.default_fqdn')
  confirm "Serve $DOMAIN from the pipeline. Before this, the DNS record must be: $DOMAIN CNAME $endpoint.
Lower the record's TTL (300) at least one old TTL before the change: Scaleway checks the CNAME through
DNS caches, and issues the Let's Encrypt certificate only once the check sees the new value."
  scw edge-services dns-stage update "$DNS_STAGE_ID" fqdns.0="$DOMAIN" tls-stage-id="$TLS_STAGE_ID"
  echo "Scaleway's CNAME check (pipeline errors; empty when it passes):"
  scwj edge-services pipeline get "$PIPELINE_ID" | jq -c '[.errors[]? | {code, message}]'
  echo "If it says the CNAME does not resolve, wait for the old TTL to expire and run this step again."
}

# The apex cannot be a CNAME, and Edge Services only takes CNAMEs, so dokos.io points (A record)
# to the flexible IP of a Load Balancer whose only job is the redirect. Each frontend has one ACL
# that matches every client and redirects. A frontend needs a backend and a backend needs a server
# IP, so the backend points to 192.0.2.1 (TEST-NET-1, reserved for documentation): the ACL answers
# first, and no request ever reaches it.
REDIRECT_TARGET="https://$DOMAIN{{path}}"
ensure_redirect_acl() {   # frontend-id
  local acl
  acl=$(scwj lb acl list frontend-id="$1" zone="$ZONE" | jq -r '.[0].id // empty')
  [[ -n "$acl" ]] && return
  scw lb acl create frontend-id="$1" zone="$ZONE" name=to-www index=0 \
    match.ip-subnet.0=0.0.0.0/0 match.ip-subnet.1=::/0 \
    action.type=redirect action.redirect.type=location action.redirect.target="$REDIRECT_TARGET" \
    action.redirect.code=301 >/dev/null
}
step_lb() {
  if [[ -z "${LB_ID:-}" ]]; then
    confirm "Create the Load Balancer '$NAME' ($LB_TYPE, $ZONE) with a flexible IP, billed monthly (about 10 EUR)."
    local ip_id
    ip_id=$(scwj lb ip create zone="$ZONE" project-id="$PROJECT_ID" | jq -r '.id')
    save LB_IP_ID "$ip_id"
    save LB_IP "$(scwj lb ip get "$ip_id" zone="$ZONE" | jq -r '.ip_address')"
    save LB_ID "$(scwj lb lb create zone="$ZONE" project-id="$PROJECT_ID" name="$NAME" type="$LB_TYPE" \
      assign-flexible-ip=false ip-ids.0="$LB_IP_ID" description="dokos.io -> https://$DOMAIN" | jq -r '.id')"
  fi
  scw lb lb wait "$LB_ID" zone="$ZONE" >/dev/null
  if [[ -z "${LB_BACKEND_ID:-}" ]]; then
    save LB_BACKEND_ID "$(scwj lb backend create lb-id="$LB_ID" zone="$ZONE" name=unused \
      forward-protocol=http forward-port=80 forward-port-algorithm=roundrobin sticky-sessions=none \
      server-ip.0=192.0.2.1 health-check.port=80 health-check.check-max-retries=1 | jq -r '.id')"
  fi
  if [[ -z "${LB_HTTP_FRONTEND_ID:-}" ]]; then
    save LB_HTTP_FRONTEND_ID "$(scwj lb frontend create lb-id="$LB_ID" zone="$ZONE" name=http \
      inbound-port=80 backend-id="$LB_BACKEND_ID" | jq -r '.id')"
  fi
  ensure_redirect_acl "$LB_HTTP_FRONTEND_ID"
  echo "HTTP redirect ready: curl -sI -H 'Host: $APEX' http://$LB_IP/fr/tarifs"
  echo "Cutover: set '$APEX A $LB_IP' (TTL 300), then run the lb-cert step."
}

step_lb_cert() {
  [[ -n "${LB_ID:-}" ]] || { echo "Run the lb step first."; exit 1; }
  local resolved; resolved=$(dig +short "$APEX" A | tail -1)
  [[ "$resolved" == "$LB_IP" ]] || { echo "$APEX resolves to '$resolved', not $LB_IP: Let's Encrypt would fail. Wait for the DNS."; exit 1; }
  if [[ -z "${LB_CERT_ID:-}" ]]; then
    confirm "Ask Let's Encrypt for a certificate for $APEX on the Load Balancer."
    save LB_CERT_ID "$(scwj lb certificate create lb-id="$LB_ID" zone="$ZONE" name="$APEX" \
      letsencrypt-common-name="$APEX" | jq -r '.id')"
  fi
  local status
  for _ in $(seq 1 20); do
    status=$(scwj lb certificate get "$LB_CERT_ID" zone="$ZONE" | jq -r '.status')
    [[ "$status" == "ready" ]] && break
    [[ "$status" == "error" ]] && { echo "Certificate error: $(scwj lb certificate get "$LB_CERT_ID" zone="$ZONE" | jq -r '.status_details')"; exit 1; }
    echo "  certificate: $status"; sleep 15
  done
  [[ "$status" == "ready" ]] || { echo "Certificate still '$status': run this step again."; exit 1; }
  if [[ -z "${LB_HTTPS_FRONTEND_ID:-}" ]]; then
    save LB_HTTPS_FRONTEND_ID "$(scwj lb frontend create lb-id="$LB_ID" zone="$ZONE" name=https \
      inbound-port=443 backend-id="$LB_BACKEND_ID" certificate-ids.0="$LB_CERT_ID" enable-http3=false | jq -r '.id')"
  fi
  ensure_redirect_acl "$LB_HTTPS_FRONTEND_ID"
  echo "Check: curl -sI https://$APEX/fr/tarifs  (301 to https://$DOMAIN/fr/tarifs)"
}

step_purge() {
  [[ -n "${PIPELINE_ID:-}" ]] || { echo "No pipeline yet."; exit 1; }
  scw edge-services purge-request create pipeline-id="$PIPELINE_ID" all=true
}

case "$STEP" in
  status|registry|iam|push|container|edge|domain|lb|purge) "step_$STEP" ;;
  lb-cert) step_lb_cert ;;
  *) sed -n '2,25p' "$0"; exit 1 ;;
esac
