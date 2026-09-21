#!/usr/bin/env node
/**
 * Fail the build if the static output grows past what Vercel's deployment
 * storage can absorb.
 *
 * Deployment Storage bills (output size) x (retained deployments), and retention
 * exceptions keep far more deployments than the retention policy suggests. In
 * September 2026 a 290 MB output across 36 retained deployments exhausted the
 * ~10 GB Hobby allotment and blocked deploys. Catching growth here is much
 * cheaper than diagnosing it from the dashboard afterwards.
 *
 * If this fires, look for: large files committed under public/, or an /_ipx
 * tree (a sign an image component started emitting IPX variants again — see
 * components/AppImage.vue).
 */
import { statSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const OUTPUT_DIR = '.output/public'
const LIMIT_MB = Number(process.env.OUTPUT_SIZE_LIMIT_MB || 120)

function walk(dir) {
    let bytes = 0
    const biggest = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) {
            const sub = walk(path)
            bytes += sub.bytes
            biggest.push(...sub.biggest)
        } else if (entry.isFile()) {
            const { size } = statSync(path)
            bytes += size
            biggest.push({ path, size })
        }
    }
    biggest.sort((a, b) => b.size - a.size)
    return { bytes, biggest: biggest.slice(0, 10) }
}

let result
try {
    result = walk(OUTPUT_DIR)
} catch (error) {
    if (error.code === 'ENOENT') {
        console.warn(`[output-size] ${OUTPUT_DIR} not found, skipping check`)
        process.exit(0)
    }
    throw error
}

const mb = result.bytes / 1024 / 1024
const report = `${mb.toFixed(1)} MB (limit ${LIMIT_MB} MB)`

if (mb > LIMIT_MB) {
    console.error(`\n[output-size] FAIL — ${OUTPUT_DIR} is ${report}\n`)
    console.error('Largest files:')
    for (const { path, size } of result.biggest) {
        console.error(`  ${(size / 1024 / 1024).toFixed(2).padStart(7)} MB  ${path}`)
    }
    console.error('\nShrink the output, or raise OUTPUT_SIZE_LIMIT_MB deliberately.\n')
    process.exit(1)
}

console.log(`[output-size] OK — ${OUTPUT_DIR} is ${report}`)
