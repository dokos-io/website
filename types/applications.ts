export interface Application {
  title?: string
  link?: string
  author?: string
  path?: string
  description?: string
  logo?: {
    light: string
    dark: string
  }
  [key: string]: unknown
}
