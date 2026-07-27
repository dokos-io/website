import type { Partner } from '../types'
import { slugify } from '../utils'

export const usePartners = () => {
  const partners = useState<Partner[]>('partners', () => [])

  // Data fetching
  async function fetchList() {
    if (partners.value.length) {
      return
    }

    try {
      const data = await queryCollection('partners').all()

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