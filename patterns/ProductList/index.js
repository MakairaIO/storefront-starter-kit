import classNames from 'classnames'
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

function ProductTile(props) {
  const {
    title = '',
    picture_url_main = '',
    manufacturer_title = '',
    shortdesc = '',
  } = props

  return (
    <article className="product-item">
      <picture className="product-item__image">
        <img src={picture_url_main} alt={title} />
      </picture>

      <ProductVariants {...props} />

      <Heading size="125" className="product-item__title">
        {title}
      </Heading>

      <span className="product-item__manufacturer">{manufacturer_title}</span>

      <Copytext className="product-item__shortdesc">{shortdesc}</Copytext>

      <ProductPrices {...props} />

      <ProductPriceHint {...props} />

      <ProductActions {...props} />
    </article>
  )
}

// TODO: Remove hard-coded variants with dynamic data
// TODO: Refactor to links here for entry on variant detail-page?
function ProductVariants(props) {
  const variants = ['#CB0A21', '#BFD56F', '#DB9CD1']

  if (variants.length == 0) return null

  return (
    <div className="product-item__variants">
      {variants.map(variant => (
        <span
          key={variant}
          className="product-item__variant"
          style={{ background: variant }}
        ></span>
      ))}
    </div>
  )
}

// TODO: format prices via helper-function
// TODO: real check for reduced prices
// TODO: handle reduced pricing and related styling properly
function ProductPrices(props) {
  const { price = 0.0 } = props

  const hasReducedPrice = Math.random() > 0.5
  if (hasReducedPrice) {
    var reducedPrice = 399.99
  }

  const classes = classNames('product-item__price', {
    ['product-item__price--current']: hasReducedPrice,
  })

  return (
    <div className="product-item__prices">
      {hasReducedPrice ? (
        <span className="product-item__price product-item__price--reduced">
          € {reducedPrice}
        </span>
      ) : (
        ''
      )}
      <span className={classes}>€ {price}</span>
    </div>
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
