import { Heading, Text, Link } from '../..'
import ProductPrices from './ProductPrices'
import ProductActions from './ProductActions'
import { getProductDetailUrl, useConfiguration } from '../../../utils'

export default function ProductTile(props) {
  const {
    title = '',
    picture_url_main = '',
    manufacturer_title = '',
    url = '',
    images = [],
  } = props

  const { getImageLink } = useConfiguration()

  const productDetailUrl = getProductDetailUrl({ url })

  const productImage = getImageLink({
    source: images.length > 0 ? images[0] : picture_url_main,
    height: 162,
  })

  return (
    <article className="stream-placement-item">
      <Link href={productDetailUrl}>
        <picture className="stream-placement-item__image">
          <img src={productImage} alt={title} loading="lazy" />
        </picture>

        <Heading
          size="bacchus"
          weight="600"
          className="stream-placement-item__title"
          element="h3"
        >
          {title}
        </Heading>

        <Text
          size="aphrodite"
          weight="600"
          className="stream-placement-item__manufacturer"
        >
          {manufacturer_title}
        </Text>

        <ProductPrices {...props} />

        <ProductActions {...props} />
      </Link>
    </article>
  )
}
