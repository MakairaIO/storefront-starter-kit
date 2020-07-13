import { Heading, Copytext, Text, Link } from '../..'
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
    url = '',
    isLazyLoad = true,
    children,
  } = props

  return (
    <article className="product-item">
      {children}
      <Link href={url}>
        <picture className="product-item__image">
          {isLazyLoad ? (
            <img data-src={picture_url_main} alt={title} />
          ) : (
            <img src={picture_url_main} alt={title} />
          )}
        </picture>

        <ProductVariants {...props} />

        <Heading size="bacchus" weight="600" className="product-item__title">
          {title}
        </Heading>

        <Text
          size="aphrodite"
          weight="600"
          className="product-item__manufacturer"
        >
          {manufacturer_title}
        </Text>

        <Copytext className="product-item__shortdesc">{shortdesc}</Copytext>

        <ProductPrices {...props} />

        <ProductPriceHint {...props} />

        <ProductActions {...props} />
      </Link>
    </article>
  )
}
