import TopHeader from './TopHeader'
import Image from './Image'
import Buybox from './Buybox'
import Description from './Description'

function ProductDetailInformation(props) {
  return (
    <section className="product-detail-information">
      <TopHeader {...props} />

      <div className="product-detail-information__wrapper">
        <Image {...props} />

        <Buybox {...props} />

        <Description {...props} />
      </div>
    </section>
  )
}

export default ProductDetailInformation
export { default as productDetailInformationVariants } from './variants.js'
