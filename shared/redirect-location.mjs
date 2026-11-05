// @ts-check
// The Location of a redirect route rule, computed like Nitro's route-rules handler
// (node_modules/nitropack/dist/runtime/internal/route-rules.mjs), but always on this host.
//
// Used by server/plugins/static-host.ts, which answers every redirect rule before Nitro's own
// handler. Copied from the documentation repository (gitlab.com/dokos/documentation).
//
// Why Nitro's handler is not enough: a prefix rule (`/features/**` -> `/fr/modules/**`) keeps
// the rest of the path, and a rule with an empty target prefix would turn `/x/\evil.example`
// into `/\evil.example`. Browsers read `/\host` and `//host` as a link to another host: an open redirect.
import { getQuery, joinURL, withQuery, withoutBase } from 'ufo'

/**
 * Collapse the leading slashes and backslashes of a path, so a Location never starts with `//`
 * or `/\`. A full URL (`https://...`) is left alone.
 * @param {string} location
 */
export function safeLocation(location) {
  if (!location.startsWith('/') && !location.startsWith('\\')) return location
  return `/${location.replace(/^[/\\]+/, '')}`
}

/**
 * @param {{ to: string, _redirectStripBase?: string }} redirect  a normalised redirect rule
 * @param {string} path  the request path, with its query string
 */
export function redirectLocation(redirect, path) {
  let target = redirect.to
  if (target.endsWith('/**')) {
    const base = redirect._redirectStripBase
    const rest = base && path.startsWith(base) ? withoutBase(path, base) : path
    target = joinURL(target.slice(0, -3) || '/', safeLocation(rest))
  } else if (path.includes('?')) {
    target = withQuery(target, getQuery(path))
  }
  return safeLocation(target)
}
