import type { Filter, Link } from './filters'

export interface Partner {
  title?: string
  description?: string
  fullDescription?: string
  path?: string
  link?: string
  twitter?: string
  github?: string
  gitlab?: string
  color?: string
  category?: string
  logo?: {
    light: string
    dark: string
  }
  logoFull?: unknown
  regions: Filter[]
  services?: Filter[]
  resources?: Link[]
  location: Filter | null
  phone?: string
  [key: string]: unknown
}
