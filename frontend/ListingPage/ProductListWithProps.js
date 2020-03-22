import { ProductList } from '../../patterns'
import { useGlobalData, submitProductListForms } from '../../utils'

export default function ProductListWithProps() {
  const { pageData, params = {} } = useGlobalData()

  // restParams = sorting, pagination, ...
  const { seoUrl, makairaFilter, ...restParams } = params

  const products = pageData.data.product.items
  const aggregations = pageData.data.product.aggregations

  const productListProps = {
    products,
    aggregations,
    submitForms: () => submitProductListForms({ aggregations }),
    queryParams: restParams,
  }

  return (
    <>
      <ProductList {...productListProps} />
    </>
  )
}
