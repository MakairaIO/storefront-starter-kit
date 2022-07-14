import { ProductList } from '../../../patterns'
import {
  useGlobalData,
  mergeProductsAndBanners,
  submitProductListForms,
  resetAllProductListFilters,
  redirectToBundle,
} from '../../../utils'

export default function ProductListWithProps() {
  const { searchResult, params = {} } = useGlobalData()

  // restParams = sorting, pagination, ...
  const { seoUrl, filter, searchPhrase, ...restParams } = params

  const products = searchResult.product.items
  const banners = searchResult.banners
  const merged = mergeProductsAndBanners({ products, banners })

  const aggregations = searchResult.product.aggregations
  const totalProductCount = searchResult.product.total

  const productListProps = {
    showEmptyResultFeedback: true,
    products: merged,
    aggregations,
    submitForms: async (options = {}) => {
      const { resetPagination = false } = options

      await submitProductListForms({
        aggregations,
        isSearch: true,
        searchPhrase,
        resetPagination,
      })
    },
    resetAllFilters: () => resetAllProductListFilters({ isSearch: true }),
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
