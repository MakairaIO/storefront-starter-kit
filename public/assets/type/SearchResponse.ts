import { Product } from '../../../public/assets/type/Product'
import { Category } from '../../../public/assets/type/Category'
import { LandingPage } from '../../../public/assets/type/LandingPage'
import { Links } from '../../../public/assets/type/Links'

export type SearchResponse<T> = {
  items: Response<T>[]
  count: number
  total: number
  offset: number
  aggregations: unknown[]
  additionalData: unknown[]
}

type Response<T> = {
  id: string
  fields: T extends 'Product'
    ? Product
    : T extends 'Category'
    ? Category
    : T extends 'Links'
    ? Links
    : T extends 'LandingPage'
    ? LandingPage
    : unknown
}
