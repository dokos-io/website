import type { Application } from '../types'

export const useApplications = () => {
  const applications = useState<Application[]>('applications', () => [])

  // Data fetching
  async function fetchList() {
    if (applications.value.length) {
      return
    }

    try {
      const data = await queryCollection('applications').all()

      applications.value = data as unknown as Application[]
    }
    catch (e) {
      applications.value = []
      return e
    }
  }

  // Computed

  const Applications = computed<Application[]>(() => {
    return [...applications.value]
  })

  return {
    fetchList,
    Applications,
  }
}