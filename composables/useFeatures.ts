import type { Feature } from '../types'

export const useFeatures = () => {
  const { locale } = useI18n()
  const features = useState<Feature[]>('features', () => [])

  // Data fetching
  async function fetchList() {
    if (features.value.length) {
      return
    }

    try {
      const data = await queryContent(`/${locale.value}/features`).where({ _extension: 'md' }).find()

      features.value = data as Feature[]
    }
    catch (e) {
      features.value = []
      return e
    }
  }

  // Computed

  const Features = computed<Feature[]>(() => {
    return [...features.value]
  })

  return {
    fetchList,
    Features,
  }
}