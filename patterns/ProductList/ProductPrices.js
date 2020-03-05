import classNames from 'classnames'

// TODO: format prices via helper-function
// TODO: real check for reduced prices
// TODO: handle reduced pricing and related styling properly
export default function ProductPrices(props) {
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
