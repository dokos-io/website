import type { Feature } from '../types'

export const useFeatures = () => {
  const features = useState<Feature[]>('features', () => [])

  // Data fetching
  async function fetchList() {
    if (features.value.length) {
      return
    }

    try {
      const data = await queryCollection('features').all()

      features.value = data as unknown as Feature[]
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