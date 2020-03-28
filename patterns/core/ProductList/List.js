import { useLazyLoading } from '../../../utils'
import ProductTile from './ProductTile'

export default function List(props) {
  const { products = [] } = props

  useLazyLoading({ selector: '.product-item', dependency: products })

  return (
    <>
      {products.map((product) => (
        <ProductTile key={product.id} {...product.fields} />
      ))}
    </>
  )
}
