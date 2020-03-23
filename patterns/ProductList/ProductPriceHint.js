import { FormattedPrice } from '..'

// TODO: Remove hard-coded implementation
export default function ProductPriceHint(props) {
  return (
    <div className="product-item__price-hint">
      <span>inkl. MwSt.</span>
      <span>
        <FormattedPrice price="37.50" /> / Liter
      </span>
    </div>
  )
}
