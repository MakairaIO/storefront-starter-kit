import ProductTile from './ProductTile'
import { Heading, Copytext, Button } from '..'

function ProductList(props) {
  const { products = [] } = props

  return (
    <section className="product-list">
      {products.map(product => (
        <ProductTile key={product.id} {...product.fields} />
      ))}
    </section>
  )
}

// TODO: Remove hard-coded implementation
function ProductPriceHint(props) {
  return (
    <div className="product-item__price-hint">
      <span>inkl. MwSt.</span>
      <span>€ 37,50 / Liter</span>
    </div>
  )
}

function ProductActions() {
  return (
    <div className="product-item__actions">
      <Button type="primary">Add to cart</Button>
    </div>
  )
}

export default ProductList
export { default as productListVariants } from './variants.js'
