export const { format: formatNumber } = Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 })

export const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9 -]/g, ' ').replace(/[\s-]+/g, '-')

export const random = (arr: Array<any>) => {
  return arr[Math.floor(Math.random() * arr.length)]
}
