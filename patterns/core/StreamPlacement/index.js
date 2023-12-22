import ProductTile from './ProductTile'
import { Heading, Copytext } from '../..'

function StreamPlacement(props) {
  const { products = [], heading = '', text = '' } = props

  if (products.length == 0) return null

  return (
    <section className="stream-placement">
      <div className="stream-placement__text">
        {heading && <Heading>{heading}</Heading>}
        {text && <Copytext dangerouslySetInnerHTML={{ __html: text }} />}
      </div>

      <div className="stream-placement__list">
        {products.map((product) => (
          <ProductTile key={product.ean} {...product} />
        ))}
      </div>
    </section>
  )
}

export default StreamPlacement
export { default as streamPlacementVariants } from './variants.js'
