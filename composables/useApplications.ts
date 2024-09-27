import type { Application } from '../types'

export const useApplications = () => {
  const { locale } = useI18n()
  const applications = useState<Application[]>('applications', () => [])

  // Data fetching
  async function fetchList() {
    if (applications.value.length) {
      return
    }

    try {
      const data = await queryContent(`/${locale.value}/applications`).where({ _extension: 'yml' }).find()

      applications.value = data as Application[]
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