import type { Module } from '../types'

export const useModules = () => {
  const modules = useState<Module[]>('modules', () => [])

  // Data fetching
  async function fetchList() {
    if (modules.value.length) {
      return
    }

    try {
      const data = await queryCollection('modules').all()
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