import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Filter } from './filters'
import type { Link } from '#ui-pro/types'

export interface Partner extends ParsedContent {
  title: string
  description: string
  fullDescription: string
  _path: string
  link: string
  twitter: string
  github: string
  gitlab: string
  logo: {
    light: string
    dark: string
  }
  regions: Filter[]
  services?: Filter[]
  resources?: Link[]
  location: Filter,
  phone: string
}