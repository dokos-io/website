#!/usr/bin/env node
/**
 * Fail the build if the deployment output grows past what Vercel's storage
 * quotas can absorb.
 *
 * Vercel bills two separate metrics, both as (size x retained deployments):
 *   - Deployment Storage: static assets and build output
 *   - Functions Storage:  the Vercel Function bundle, per region it deploys to
 *
 * In September 2026 a ~290 MB static output plus a 106 MB function bundle,
 * across 36 retained deployments, exhausted the Hobby allotment and blocked
 * deploys. Catching growth here is far cheaper than diagnosing it afterwards.
 *
 * If STATIC fires, look for large files committed under public/, or an /_ipx
 * tree (an image component emitting IPX variants again — see AppImage.vue).
 * If FUNCTION fires, look at the Nuxt Icon server bundle: `ui.icons` pulls in
 * whole Iconify collections, which alone accounted for 62 MB.
 *
 * Invoked from the `build` script rather than a `postbuild` hook, because Yarn
 * Berry does not reliably run npm-style pre/post lifecycle scripts.
 */
import { statSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// Vercel's nitro preset writes .vercel/output; a plain `nuxt build` writes .output
const TARGETS = [
    {
        label: 'STATIC (Deployment Storage)',
        dirs: ['.vercel/output/static', '.output/public'],
        limitMb: Number(process.env.STATIC_SIZE_LIMIT_MB || 120),
    },
    {
        label: 'FUNCTION (Functions Storage)',
        dirs: ['.vercel/output/functions', '.output/server'],
        limitMb: Number(process.env.FUNCTION_SIZE_LIMIT_MB || 130),
    },
]

function walk(dir) {
    let bytes = 0
    let files = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) {
            const sub = walk(path)
            bytes += sub.bytes
            files.push(...sub.files)
        } else if (entry.isFile()) {
            const { size } = statSync(path)
            bytes += size
            files.push({ path, size })
        }
    }
    files.sort((a, b) => b.size - a.size)
    return { bytes, files: files.slice(0, 10) }
}

let failed = false
let checked = 0

for (const { label, dirs, limitMb } of TARGETS) {
    const dir = dirs.find(d => existsSync(d))
    if (!dir) {
        console.warn(`[output-size] ${label}: none of ${dirs.join(', ')} found, skipping`)
        continue
    }
    checked++
    const { bytes, files } = walk(dir)
    const mb = bytes / 1024 / 1024
    const report = `${dir} is ${mb.toFixed(1)} MB (limit ${limitMb} MB)`

    if (mb > limitMb) {
        failed = true
        console.error(`\n[output-size] FAIL — ${label}: ${report}\n`)
        console.error('Largest files:')
        for (const { path, size } of files) {
            console.error(`  ${(size / 1024 / 1024).toFixed(2).padStart(7)} MB  ${path}`)
        }
    } else {
        console.log(`[output-size] OK — ${label}: ${report}`)
    }
}

if (!checked) {
    console.warn('[output-size] nothing to check — did the build run?')
}

if (failed) {
    console.error('\nShrink the output, or raise the limit deliberately via '
        + 'STATIC_SIZE_LIMIT_MB / FUNCTION_SIZE_LIMIT_MB.\n')
    process.exit(1)
}
