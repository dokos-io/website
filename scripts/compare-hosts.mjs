#!/usr/bin/env node
// Compare how two hosts of the site answer every URL it must handle.
//
//   node scripts/compare-hosts.mjs <reference> <candidate> [--concurrency 8]
//
// Example, before the cutover: the Vercel deployment of a commit against the Scaleway Edge
// endpoint running the same commit. Both must serve the same build, or every page added or
// removed in between shows up as a difference.
//
// URLs checked: every prerendered page of the local build (.output/public/**/index.html, so run
// `yarn build` first) and every redirect source of the routeRules in nuxt.config.ts, with a
// sample path below each `/**` rule. Each URL is requested once on each host with HEAD, without
// following redirects; the status and the Location (as a path when it stays on the host) are
// compared. Exits 1 on any difference.
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const args = process.argv.slice(2)
const ci = args.indexOf('--concurrency')
const concurrency = ci >= 0 ? Number(args.splice(ci, 2)[1]) : 8
const [reference, candidate] = args.map((host) => host?.replace(/\/$/, ''))
if (!reference || !candidate) {
  console.error('Usage: node scripts/compare-hosts.mjs <reference> <candidate> [--concurrency 8]')
  process.exit(1)
}

function pages(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...pages(path))
    else if (entry.name === 'index.html') out.push(`/${relative(join(ROOT, '.output/public'), dir)}`.replace(/\/$/, '') || '/')
  }
  return out
}

function redirectSources() {
  const config = readFileSync(join(ROOT, 'nuxt.config.ts'), 'utf8')
  return [...config.matchAll(/'([^']+)':\s*\{\s*redirect:/g)].map(([, source]) =>
    source.endsWith('/**') ? `${source.slice(0, -3)}/ventes` : source)
}

async function answer(host, path) {
  try {
    const response = await fetch(host + path, { method: 'HEAD', redirect: 'manual' })
    const location = response.headers.get('location')?.replace(host, '') ?? ''
    return `${response.status} ${location}`.trim()
  } catch (error) {
    return `error ${error.cause?.code ?? error.message}`
  }
}

const paths = [...new Set([...pages(join(ROOT, '.output/public')), ...redirectSources(), '/fr/tarifs/', '/api/search.json'])].sort()
const differences = []
let next = 0
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (next < paths.length) {
    const path = paths[next++]
    const [a, b] = await Promise.all([answer(reference, path), answer(candidate, path)])
    if (a !== b) differences.push({ path, reference: a, candidate: b })
  }
}))

console.log(`${paths.length} URLs, ${differences.length} differences`)
for (const { path, reference: a, candidate: b } of differences.sort((x, y) => x.path.localeCompare(y.path))) {
  console.log(`  ${path}\n    reference: ${a}\n    candidate: ${b}`)
}
process.exit(differences.length ? 1 : 0)
