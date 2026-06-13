export interface Module {
  title?: string
  description?: string
  path?: string
  icon?: string
  logo?: {
    light: string
    dark: string
  }
  [key: string]: unknown
}
