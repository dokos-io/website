import type { Module } from '../types'

export const useModules = () => {
  const { locale } = useI18n()
  const modules = useState<Module[]>('modules', () => [])

  // Data fetching
  async function fetchList() {
    if (modules.value.length) {
      return
    }

    try {
      const data = await queryContent(`/${locale.value}/modules`).where({ _extension: 'yml' }).find()

      modules.value = data as Module[]
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