import type { Partner } from '../types'
import { slugify } from '../utils'

export const usePartners = () => {
  // See useModules.ts for why this reads $i18n instead of calling useI18n().
  const { $i18n } = useNuxtApp()
  const locale = $i18n.locale
  // Keyed by locale, see the identical comment in useModules.ts.
  const partners = useState<Partner[]>(`partners-${locale.value}`, () => [])

  // Data fetching
  async function fetchList() {
    if (partners.value.length) {
      return
    }

    try {
      const data = await queryCollection('partners')
        .where('path', 'LIKE', `/${locale.value}/partners/%`)
        .all()

      partners.value = data.map(partner => ({
        ...partner,
        services: ((partner.services as string[]) || []).map((service: string) => ({
          key: slugify(service),
          label: service
        })),
        regions: ((partner.regions as string[]) || []).map((region: string) => ({
          key: slugify(region),
          label: region
        })),
        location: partner.location
          ? {
              key: slugify(partner.location as string),
              label: partner.location as string
            }
          : null
      })) as Partner[]
    }
    catch (e) {
      partners.value = []
      return e
    }
  }

  // Computed

  const Partners = computed<Partner[]>(() => {
    return [...partners.value]
  })

  return {
    fetchList,
    Partners,
  }
}