# dokos.io

The website of Dokos SAS, published at https://www.dokos.io. Built with Nuxt 4, Nuxt Content 3
and Nuxt UI 4.

The repository lives at https://gitlab.com/dokos/website. The GitHub repository
(`dokos-io/website`) is a read-only mirror: open issues and merge requests on GitLab.

## Develop

Node 24 (nuxt-og-image 7 needs Node >= 24.15) and the Yarn release that the repository includes.

```bash
yarn install
yarn dev          # http://localhost:3000
yarn lint:copy    # the editorial rules of docs/editorial-guidelines.md
yarn build        # the Node server and the prerendered pages, then the output size check
node .output/server/index.mjs
```

Content is in `content/fr/` and `content/en/`. The product page schema is in
`docs/product-page-schema.md`, and the editorial rules are in `docs/editorial-guidelines.md`.

## Deploy

Merge requests build the site in GitLab CI. Each push to the deploy branch deploys to Scaleway
(`.gitlab-ci.yml`). The deploy branch is the CI variable `SCALEWAY_DEPLOY_BRANCH`:
`feat-dokos-ecosystem` until the revamp is merged, then `main`.

1. `image:scaleway` builds the site and pushes a Docker image (`Dockerfile`) tagged with the commit.
2. `release:scaleway` runs that image on the Serverless Container, checks a few pages and
   redirects, and empties the Edge Services cache.

To roll back, use "Rollback" on an older deployment of the `production` environment in GitLab.

Hosting, the same as doc.dokos.io (Scaleway project "documentation", region fr-par):

- `www.dokos.io`: a CNAME to an Edge Services pipeline (CDN and Let's Encrypt certificate), in
  front of a Serverless Container that runs the Nitro Node server.
- `dokos.io`: an A record to a Load Balancer that redirects (301) to `https://www.dokos.io`.

`infra/scaleway/setup.sh` creates and updates these resources, one step at a time.
`infra/scaleway/deploy.sh` is the deploy script that CI runs. `scripts/compare-hosts.mjs`
compares how two hosts answer every page and redirect.
