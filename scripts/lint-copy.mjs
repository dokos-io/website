#!/usr/bin/env node
/**
 * Copy lint for dokos.io. Greps the French content for the words, phrases and
 * patterns banned by docs/editorial-guidelines.md, and checks that every app
 * sits under exactly one theme. Exit 1 on any hit.
 *
 *   yarn lint:copy            # whole site
 *   yarn lint:copy content/fr/tarifs.yml
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'

const ROOT = new URL('..', import.meta.url).pathname
const PROSE_SKIP_KEYS = /^(\s*(?:- )?)(icon|to|image|logo|light|dark|color|class|variant|size|id|slug|theme|src|target|video|screenshot|marketplace|docs|licence|publisher|version|related|navigation\.icon|right_icon|left_icon|align)\s*:/

const rules = [
  { id: 'em_dash', re: /—|&mdash;/u },
  { id: 'x_pas_y', re: /,\s*pas\s+(un|une|le|la|les|des?|d'|à|en|par)\b/iu },
  { id: 'pas_seulement', re: /\bpas\s+seulement\b/iu },
  { id: 'aphorism', re: /C'est le principe|Dit franchement|\bEn clair\b|Autant l'écrire|Tout simplement|Le meilleur .{0,30}, c'est/iu },
  { id: 'banned_word', re: /\b(puissant\w*|innovant\w*|visionnaire\w*|révolutionn\w*)\b|\bLA plateforme\b|\b100\s?%/iu },
  { id: 'ethique_adj', re: /\b(logiciel|plateforme|solution|entreprise|outil)s?\s+éthiques?\b/iu },
  { id: 'procurement', re: /\b(service achats|grille d'exigences|opposables?|grands comptes|secteur public|appel d'offres)\b/iu },
  { id: 'secnumcloud_promise', re: /(déployons|déployer|hébergeur)\s+[^.]{0,40}SecNumCloud|SecNumCloud[^.]{0,60}(échéance|prochain)/iu },
  { id: 'france_only', re: /(exclusivement|uniquement|strictement)\s+(en\s+)?fran[cç]ais|exclusivement en France|localisation strictement française/iu },
  { id: 'eu_subprocessors', re: /sous-traitants?\s+(sont\s+)?établis\s+dans\s+l'Union/iu },
  { id: 'client_name', re: /\bOrange\b/u },
]
const BUDGET = [/souverain\w*/giu, /garanti\w*/giu, /réversib\w*/giu]
const BUDGET_ALLOW = [/garantissons/giu, /Garanties de niveau/giu]
const BUDGET_MAX = 3

const SKIP_DIRS = new Set(['blog'])
const SKIP_FILES = new Set(['hostingconditions.md', 'termsandconditions.md', 'legal.md', 'securityandprivacy.md', 'rgpdandeprivacy.md'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(p, out)
    }
    else if (/\.(ya?ml|md)$/.test(name) && !SKIP_FILES.has(name)) {
      out.push(p)
    }
  }
  return out
}

const args = process.argv.slice(2)
const files = args.length ? args.map(a => join(ROOT, a)) : walk(join(ROOT, 'content/fr'))
const hits = []

for (const file of files) {
  const rel = relative(ROOT, file)
  const text = readFileSync(file, 'utf8')
  const lines = text.split('\n')
  let inFaq = false
  let budget = 0
  lines.forEach((line, i) => {
    if (/^faq:/.test(line)) inFaq = true
    else if (/^[a-z_]+:/.test(line)) inFaq = false
    if (line.trim().startsWith('#')) return
    if (PROSE_SKIP_KEYS.test(line)) return
    for (const rule of rules) {
      const m = line.match(rule.re)
      if (m) hits.push({ rel, line: i + 1, id: rule.id, excerpt: m[0] })
    }
    if (!inFaq && /^\s*(?:- )?(title|hero_title|label|name|headline):.*\?\s*["']?\s*$/.test(line)) {
      hits.push({ rel, line: i + 1, id: 'question_heading', excerpt: line.trim().slice(0, 80) })
    }
    let scrubbed = line
    for (const allow of BUDGET_ALLOW) scrubbed = scrubbed.replace(allow, '')
    for (const re of BUDGET) budget += (scrubbed.match(re) || []).length
  })
  if (budget > BUDGET_MAX) hits.push({ rel, line: 0, id: 'budget_words', excerpt: `${budget} occurrences of souverain*/garanti*/réversib* (max ${BUDGET_MAX})` })
}

// Themes: every module's theme is known, and no module is listed by two theme pages.
try {
  const themesSrc = readFileSync(join(ROOT, 'utils/themes.ts'), 'utf8')
  const known = new Set([...themesSrc.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]))
  known.add('base')
  const modulesDir = join(ROOT, 'content/fr/modules')
  for (const name of readdirSync(modulesDir)) {
    const m = readFileSync(join(modulesDir, name), 'utf8').match(/^theme:\s*(\S+)/m)
    if (!m) hits.push({ rel: `content/fr/modules/${name}`, line: 0, id: 'theme_missing', excerpt: 'no theme:' })
    else if (!known.has(m[1])) hits.push({ rel: `content/fr/modules/${name}`, line: 0, id: 'theme_unknown', excerpt: m[1] })
  }
  const seen = new Map()
  const ecoDir = join(ROOT, 'content/fr/ecosysteme')
  for (const name of readdirSync(ecoDir)) {
    const text = readFileSync(join(ecoDir, name), 'utf8')
    for (const m of text.matchAll(/^\s*to:\s*\/fr\/modules\/([\w-]+)/gm)) {
      const prev = seen.get(m[1])
      if (prev && prev !== name) hits.push({ rel: `content/fr/ecosysteme/${name}`, line: 0, id: 'theme_duplicate', excerpt: `${m[1]} also listed in ${prev}` })
      seen.set(m[1], name)
    }
  }
}
catch (e) {
  hits.push({ rel: 'utils/themes.ts', line: 0, id: 'theme_check_failed', excerpt: String(e.message) })
}

for (const h of hits) console.log(`${h.rel}:${h.line}: ${h.id}: ${h.excerpt}`)
console.log(hits.length ? `\n${hits.length} hit(s)` : 'lint-copy: no hit')
process.exit(hits.length ? 1 : 0)
