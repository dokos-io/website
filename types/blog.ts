export interface BlogPost {
  title?: string
  description?: string
  date?: string
  path?: string
  image?: unknown
  badge?: unknown
  author?: unknown
  authors?: unknown[]
  [key: string]: unknown
}
