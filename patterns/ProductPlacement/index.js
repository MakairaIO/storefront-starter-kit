import { Component } from 'react'
import ProductTile from './ProductTile'
import Heading from '../Heading'
import Copytext from '../Copytext'

class ProductPlacement extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { products = [], heading = '', text = '' } = this.props

    return (
      <section className="product-placement">
        <div className="product-placement__text">
          <Heading>{heading}</Heading>
          <Copytext>{text}</Copytext>
        </div>

        <div className="product-placement__list">
          {products.map((product) => (
            <ProductTile key={product.id} {...product.fields} />
          ))}
        </div>
      </section>
    )
  }
}

export default ProductPlacement
export { default as productPlacementVariants } from './variants.js'
