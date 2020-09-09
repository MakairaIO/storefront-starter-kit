import { useRef } from 'react'
import ProductTile from './ProductTile'
import { Heading } from '../..'
import { useLazyLoading } from '../../../utils'

function ProductPlacement(props) {
  const { products = [], heading = '' } = props
  const listRef = useRef(null)

  useLazyLoading({ ref: listRef, dependency: products })

  if (products.length == 0) return null

  return (
    <section className="product-placement">
      <div className="product-placement__text">
        {heading && <Heading>{heading}</Heading>}
      </div>

      <div ref={listRef} className="product-placement__list">
        {products.map((product) => (
          <ProductTile key={product.ean} {...product} />
        ))}
      </div>
    </section>
  )
}

export default ProductPlacement
export { default as productPlacementVariants } from './variants.js'
