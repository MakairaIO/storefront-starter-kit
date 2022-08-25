import { ProductList } from '../../../patterns'
import {
  useGlobalData,
  mergeProductsAndBanners,
  submitProductListForms,
  resetAllProductListFilters,
  redirectToBundle,
} from '../../../utils'

export default function ProductListWithProps() {
  const { pageData, params = {} } = useGlobalData()

  // restParams = sorting, pagination, ...
  const { filter, ...restParams } = params

  if (!pageData.data?.product) return null

  const products = pageData.data.product.items
  const banners = pageData.data.banners
  const merged = mergeProductsAndBanners({ products, banners })

  const aggregations = pageData.data.product.aggregations
  const totalProductCount = pageData.data.product.total

  const productListProps = {
    products: merged,
    aggregations,
    submitForms: async (options = {}) => {
      const { resetPagination = false } = options

      await submitProductListForms({ aggregations, resetPagination })
    },
    resetAllFilters: resetAllProductListFilters,
    queryParams: restParams,
    totalProductCount,
    addToBundle: (productId) => {
      const product = products.find((item) => item.id === productId) || {}
      redirectToBundle({ product: product.fields, params })
    },
  }

  return (
    <>
      <ProductList {...productListProps} />
    </>
  )
}
