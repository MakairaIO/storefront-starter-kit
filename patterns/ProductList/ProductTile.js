import { Heading, Copytext } from '..'
import ProductVariants from './ProductVariants'
import ProductPrices from './ProductPrices'
import ProductPriceHint from './ProductPriceHint'
import ProductActions from './ProductActions'

export default function ProductTile(props) {
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
