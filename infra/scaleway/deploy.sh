#!/usr/bin/env bash
# Deploy www.dokos.io to Scaleway. Used by the GitLab CI jobs and by hand.
#
#   infra/scaleway/deploy.sh image            build the image from .output/ and push it, tagged with the commit
#   infra/scaleway/deploy.sh release [tag]    run that image (default: this commit) and empty the CDN cache
#
# Rollback: run `release <older tag>`, or "Rollback" on the production environment in GitLab
# (it reruns the older release job; the image is already in the registry, so nothing is rebuilt).
#
# Needs SCW_ACCESS_KEY and SCW_SECRET_KEY (the dokos-website-ci key). For `release`, also the
# container and CDN pipeline IDs: the CI variables SCW_SITE_CONTAINER_ID and SCW_SITE_PIPELINE_ID,
# or, by hand, the local infra/scaleway/resources.env written by setup.sh.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="${SITE_REPO:-$(cd "$HERE/../.." && pwd)}"
[[ -f "$HERE/resources.env" ]] && source "$HERE/resources.env"
CONTAINER_ID="${SCW_SITE_CONTAINER_ID:-${CONTAINER_ID:-}}"
PIPELINE_ID="${SCW_SITE_PIPELINE_ID:-${PIPELINE_ID:-}}"
REGION="${SCW_DEFAULT_REGION:-fr-par}"
REGISTRY="rg.$REGION.scw.cloud/dokos-website"
READY_TIMEOUT=600   # seconds

: "${SCW_SECRET_KEY:?SCW_SECRET_KEY is not set (dokos-website-ci key)}"
TAG="${2:-${CI_COMMIT_SHA:-$(git -C "$REPO" rev-parse HEAD)}}"
TAG="${TAG:0:12}"
IMAGE="$REGISTRY/site:$TAG"

image() {
  [[ -f "$REPO/.output/server/index.mjs" ]] || { echo "No .output/: run 'yarn build' first."; exit 1; }
  echo "$SCW_SECRET_KEY" | docker login "rg.$REGION.scw.cloud" -u nologin --password-stdin
  docker build --pull -t "$IMAGE" "$REPO"
  docker push "$IMAGE"
  echo "Pushed $IMAGE"
}

container_field() { scw container container get "$CONTAINER_ID" region="$REGION" -o json | jq -r "$1"; }

# expect <path> <status> [location]: one request, no redirect followed.
expect() {
  local out code location
  out=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$ENDPOINT$1")
  code="${out%% *}"; location="${out#* }"
  [[ "$code" == "$2" ]] || { echo "$1: $code, expected $2"; exit 1; }
  [[ -z "${3:-}" || "$location" == "$ENDPOINT$3" ]] || { echo "$1: Location $location, expected $3"; exit 1; }
}

release() {
  : "${CONTAINER_ID:?No container ID: set SCW_SITE_CONTAINER_ID, or run setup.sh container}"
  echo "Deploying $IMAGE to container $CONTAINER_ID"
  scw container container update "$CONTAINER_ID" region="$REGION" image="$IMAGE" >/dev/null

  # The update starts a deployment; wait until the container is ready on the new image.
  local waited=0 status
  sleep 10
  while true; do
    status=$(container_field '.status')
    [[ "$status" == "ready" ]] && break
    if [[ "$status" == "error" ]]; then
      echo "Deployment failed: $(container_field '.error_message')"
      exit 1
    fi
    (( waited >= READY_TIMEOUT )) && { echo "Still '$status' after ${READY_TIMEOUT}s."; exit 1; }
    echo "  status: $status"
    sleep 15; waited=$((waited + 15))
  done
  [[ "$(container_field '.image')" == "$IMAGE" ]] || { echo "The container does not run $IMAGE."; exit 1; }

  # Smoke test on the container's own endpoint, before the cache is emptied.
  ENDPOINT="https://$(container_field '.public_endpoint // .domain_name' | sed 's#^https://##')"
  expect /fr 200
  expect /fr/tarifs 200
  expect /api/search.json 200
  expect /pricing 301 /fr/tarifs
  expect /modules/ocr 301 /fr/modules/etransactions
  expect /features/ventes 301 /fr/modules/ventes
  expect /fr/tarifs/ 301 /fr/tarifs
  echo "Container ready: $ENDPOINT"

  if [[ -n "${PIPELINE_ID:-}" ]]; then
    scw edge-services purge-request create pipeline-id="$PIPELINE_ID" all=true >/dev/null
    echo "CDN cache emptied."
  fi
}

case "${1:-}" in
  image) image ;;
  release) release ;;
  *) sed -n '2,12p' "$0"; exit 1 ;;
esac
