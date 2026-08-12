import { queryCollectionSearchSections } from '@nuxt/content/server'

// Aggregate full-text search sections across the page-type collections so the
// command palette (UContentSearch) can index the whole site.
const collections = ['pages', 'blog', 'features', 'modules', 'partners'] as const

export default eventHandler(async (event) => {
  const sections = await Promise.all(
    collections.map((collection) => queryCollectionSearchSections(event, collection)),
  )

  return sections.flat()
})
