import ProductTile from './ProductTile'
import { Heading, Copytext } from '../..'

function ProductPlacement(props) {
  const { products = [], heading = '', text = '' } = props

  if (products.length == 0) return null

  return (
    <section className="product-placement">
      <div className="product-placement__text">
        {heading && <Heading>{heading}</Heading>}
        {text && <Copytext dangerouslySetInnerHTML={{ __html: text }} />}
      </div>

      <div className="product-placement__list">
        {products.map((product) => (
          <ProductTile key={product.ean} {...product} />
        ))}
      </div>
    </section>
  )
}

export default ProductPlacement
export { default as productPlacementVariants } from './variants.js'
