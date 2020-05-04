import { Copytext, FormattedPrice } from '../..'

// TODO: Remove hard-coded implementation
export default function ProductPriceHint() {
  return (
    <Copytext size="zero" className="product-detail-information__price-hint">
      <span>
        Basispreis <FormattedPrice price="37.50" /> / TV
      </span>
      <span>
        inkl. MwSt., zzgl <a href="#todo">Versandkosten</a>
      </span>
    </Copytext>
  )
}
