import TopHeader from './TopHeader'
import Image from './Image'
import Buybox from './Buybox'
import Description from './Description'
import { useState } from 'react'

function ProductDetailInformation(props) {
  const { 'makaira-product': variants = [] } = props

  /**
   * We have to perform an additional check on the variant structure for backwards compatability.
   * Some users might receive a single variant but in that case it's not an array of length 1 but
   * instead a plain object. In these cases, the swatches are not relevant.
   */
  const [activeVariant, setActiveVariant] = useState(() => {
    const initialVariant = Array.isArray(variants) ? variants[0] : variants

    return initialVariant
  })

  return (
    <section className="product-detail-information">
      <TopHeader {...props} />

      <div className="product-detail-information__wrapper">
        <Image {...props} activeVariant={activeVariant} />

        <Buybox
          {...props}
          activeVariant={activeVariant}
          setActiveVariant={setActiveVariant}
        />

        <Description {...props} />
      </div>
    </section>
  )
}

export default ProductDetailInformation
export { default as productDetailInformationVariants } from './variants.js'
