import classNames from 'classnames'

// TODO: Remove hard-coded implementation
export default function ProductAvailability() {
  const isOnStock = true

  const classes = classNames('product-detail-information__availability', {
    ['product-detail-information__availability--on-stock']: isOnStock,
  })

  return (
    <span className={classes}>
      <span className="product-detail-information__availability-icon" />
      1-2 Tage Lieferzeit
    </span>
  )
}
