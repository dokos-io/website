# Runtime image of www.dokos.io: the Nitro Node server and the prerendered pages.
#
# The site is built outside Docker (`yarn build`, in CI or locally), so this image only
# packages `.output/`, which is self-contained: Nitro copies the server dependencies it needs
# into `.output/server/node_modules`. Nuxt Content answers the client-side queries from its
# database with the `node:sqlite` module built into Node (`content.experimental` in
# nuxt.config.ts), so no native module has to match this image.
#
#   yarn build
#   docker build -t dokos-website .
#   docker run --rm -p 8080:8080 dokos-website
#
# Node 24: nuxt-og-image 7 needs Node >= 24.15.
FROM node:24-slim

# Scaleway Serverless Containers set PORT (8080 by default); Nitro reads PORT and HOST.
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8080

# Nuxt Content restores its database from the dump bundled in the server on the first query.
# Without this, the path is the build directory of the machine that built the site.
ENV NUXT_CONTENT_DATABASE_FILENAME=/tmp/contents.sqlite

WORKDIR /app

# Owned by root and read-only for the server; the server only writes to /tmp.
COPY .output ./.output

USER node
EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
