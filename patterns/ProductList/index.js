import ProductTile from './ProductTile'

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

export default ProductList
export { default as productListVariants } from './variants.js'
