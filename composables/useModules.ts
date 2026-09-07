import type { Module } from '../types'

export const useModules = () => {
  // Reads the locale via $i18n rather than calling the useI18n() composable:
  // several callers (Header.vue, Footer.vue, pages/modules/index.vue) already
  // own a local-scope useI18n() for their own t(), and a second useI18n()
  // call from inside this composable trips vue-i18n's "duplicate useI18n
  // calling by local scope" warning.
  const { $i18n } = useNuxtApp()
  const locale = $i18n.locale
  // Keyed by locale: the collection now mixes fr/** and en/** documents, and
  // useState is a global singleton, so a locale-less key would serve stale
  // French modules after a client-side switch to English (and vice versa).
  const modules = useState<Module[]>(`modules-${locale.value}`, () => [])

  // Data fetching
  async function fetchList() {
    if (modules.value.length) {
      return
    }

    try {
      const data = await queryCollection('modules')
        .where('path', 'LIKE', `/${locale.value}/modules/%`)
        .all()
      modules.value = data as unknown as Module[]
    }
    catch (e) {
      modules.value = []
      return e
    }
  }

  // Computed

  const Modules = computed<Module[]>(() => {
    return [...modules.value]
  })

  return {
    fetchList,
    Modules,
  }
}