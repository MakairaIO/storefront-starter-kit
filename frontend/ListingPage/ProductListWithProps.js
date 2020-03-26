import { ProductList } from '../../patterns'
import {
  useGlobalData,
  submitProductListForms,
  resetAllProductListFilters,
} from '../../utils'

export default function ProductListWithProps() {
  const { pageData, params = {} } = useGlobalData()

  // restParams = sorting, pagination, ...
  const { filter, ...restParams } = params

  const products = pageData.data.product.items
  const aggregations = pageData.data.product.aggregations
  const totalProductCount = pageData.data.product.total

  const productListProps = {
    products,
    aggregations,
    submitForms: () => submitProductListForms({ aggregations }),
    resetAllFilters: resetAllProductListFilters,
    queryParams: restParams,
    totalProductCount,
  }

  return (
    <>
      <ProductList {...productListProps} />
    </>
  )
}
