import classNames from 'classnames'
import { FormattedPrice } from '../..'

// TODO: real check for reduced prices
// TODO: handle reduced pricing and related styling properly
export default function ProductPrices(props) {
  const { price = 0.0 } = props

  const hasReducedPrice = true
  const reducedPrice = 399.99

  const classes = classNames('product-detail-information__price', {
    ['product-detail-information__price--current']: hasReducedPrice,
  })

  return (
    <div className="product-detail-information__prices">
      <FormattedPrice
        price={reducedPrice}
        className="product-detail-information__price product-detail-information__price--reduced"
      />

      <FormattedPrice price={price} className={classes} />
    </div>
  )
}
