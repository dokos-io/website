import type { ParsedContent } from '@nuxt/content'


export interface Application extends ParsedContent {
  title: string
  link: string
  author: string
  _path: string
  logo: {
    light: string
    dark: string
  }
  description: string
}