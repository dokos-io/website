import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Application extends ParsedContent {
  app_name: string
  link: string
  author: string
  _path: string
  logo: {
    light: string
    dark: string
  }
  description: string
}