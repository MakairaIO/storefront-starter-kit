import { ProductList } from '../../patterns'
import {
  useGlobalData,
  submitProductListForms,
  resetAllProductListFilters,
} from '../../utils'

export default function ProductListWithProps() {
  const { searchResult, params = {} } = useGlobalData()

  // restParams = sorting, pagination, ...
  const { seoUrl, filter, searchPhrase, ...restParams } = params

  const products = searchResult.product.items
  const aggregations = searchResult.product.aggregations
  const totalProductCount = searchResult.product.total

  const productListProps = {
    products,
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
  }

  return (
    <>
      <ProductList {...productListProps} />
    </>
  )
}
