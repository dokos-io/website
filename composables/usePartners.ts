import type { Partner, Filter } from '../types'
import { slugify, random } from '../utils'

export const usePartners = () => {
  const { locale } = useI18n()
  const partners = useState<Partner[]>('partners', () => [])

  // Data fetching
  async function fetchList() {
    if (partners.value.length) {
      return
    }

    try {
      const data = await queryContent('/partners').where({ _locale: locale.value}).where({ _extension: 'md' }).find()

      partners.value = data.map(partner => ({
        ...partner,
        services: (partner.services || []).map((service: string) => ({
          key: slugify(service),
          label: service
        })),
        regions: (partner.regions || []).map((region: string) => ({
          key: slugify(region),
          label: region
        })),
        location: partner.location
          ? {
              key: slugify(partner.location),
              label: partner.location
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