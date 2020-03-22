import { ProductList } from '../../patterns'
import { useGlobalData, submitProductListForms } from '../../utils'

export default function ProductListWithProps() {
  const { pageData, params = {} } = useGlobalData()

  // restParams = sorting, pagination, ...
  const { seoUrl, makairaFilter, ...restParams } = params

  const products = pageData.data.product.items
  const aggregations = pageData.data.product.aggregations
  const totalProductCount = pageData.data.product.total

  const productListProps = {
    products,
    aggregations,
    submitForms: () => submitProductListForms({ aggregations }),
    queryParams: restParams,
    totalProductCount,
  }

  return (
    <>
      <ProductList {...productListProps} />
    </>
  )
}
