import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Feature extends ParsedContent {
  title: string
  description: string
  _path: string
  logo: {
    light: string
    dark: string
  }
}