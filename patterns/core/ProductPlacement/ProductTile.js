import { Heading, Text, Link } from '../..'
import ProductPrices from './ProductPrices'
import ProductPriceHint from './ProductPriceHint'
import ProductActions from './ProductActions'

export default function ProductTile(props) {
  const {
    title = '',
    picture_url_main = '',
    manufacturer_title = '',
    url = '',
  } = props

  return (
    <article className="product-placement-item">
      <Link href={url}>
        <picture className="product-placement-item__image">
          <img data-src={picture_url_main} alt={title} />
        </picture>

        <Heading
          size="bacchus"
          weight="600"
          className="product-placement-item__title"
          element="h3"
        >
          {title}
        </Heading>

        <Text
          size="aphrodite"
          weight="600"
          className="product-placement-item__manufacturer"
        >
          {manufacturer_title}
        </Text>

        <ProductPrices {...props} />

        <ProductPriceHint {...props} />

        <ProductActions {...props} />
      </Link>
    </article>
  )
}
