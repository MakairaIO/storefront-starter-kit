import { Copytext, FormattedPrice } from '../..'

// TODO: Remove hard-coded implementation
export default function ProductPriceHint() {
  return (
    <Copytext size="zero" className="product-detail-information__price-hint">
      <span>
        Basispreis <FormattedPrice />
      </span>
    </Copytext>
  )
}
