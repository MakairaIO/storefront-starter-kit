import { ProductList } from '../../patterns'
import { useGlobalData, submitProductListForms } from '../../utils'

export default function ProductListWithProps() {
  const { pageData } = useGlobalData()

  const products = pageData.data.product.items
  const aggregations = pageData.data.product.aggregations

  const productListProps = {
    products,
    aggregations,
    submitForms: () => submitProductListForms({ aggregations }),
  }

  return (
    <>
      <ProductList {...productListProps} />
    </>
  )
}
