import type { Feature } from '../types'

export const useFeatures = () => {
  // See useModules.ts for why this reads $i18n instead of calling useI18n().
  const { $i18n } = useNuxtApp()
  const locale = $i18n.locale
  // Keyed by locale, see the identical comment in useModules.ts.
  const features = useState<Feature[]>(`features-${locale.value}`, () => [])

  // Data fetching
  async function fetchList() {
    if (features.value.length) {
      return
    }

    try {
      const data = await queryCollection('features')
        .where('path', 'LIKE', `/${locale.value}/features/%`)
        .all()

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