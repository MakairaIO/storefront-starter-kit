import { FormattedPrice } from '../..'

// TODO: Remove hard-coded implementation
export default function ProductPriceHint() {
  return (
    <div className="product-placement-item__price-hint">
      <span>
        <FormattedPrice />
      </span>
    </div>
  )
}
