export type Product = {
  ean?: string
  manufacturer_title?: string
  manufacturerid?: string
  datatype?: string
  price?: number
  picture_url_main?: string
  id?: string
  title?: string
  url?: string
  longdesc?: string
  onstock?: boolean
  compareAtPrice?: number | null
  attributeStr?: {
    id: string
    title: string
    value: string[]
  }[]
  'makaira-product'?: Product[]
}
