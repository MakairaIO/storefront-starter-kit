import ProductTile from './ProductTile'
import { Heading, Copytext } from '../..'

function ProductPlacement(props) {
  const { products = [], heading = '', text = '' } = props

  return (
    <section className="product-placement">
      <div className="product-placement__text">
        {heading && <Heading>{heading}</Heading>}
        {text && <Copytext>{text}</Copytext>}
      </div>

      <div className="product-placement__list">
        {products.map((product) => (
          <ProductTile key={product.id} {...product.fields} />
        ))}
      </div>
    </section>
  )
}

export default ProductPlacement
export { default as productPlacementVariants } from './variants.js'
