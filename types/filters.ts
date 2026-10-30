export interface Link {
  label?: string
  to?: string
  icon?: string
  target?: string
  [key: string]: unknown
}

export interface Filter {
  key: string | number
  label: string
  icon?: string
  to?: string
}
