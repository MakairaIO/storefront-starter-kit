import { Heading, Text, Link } from '../..'
import ProductPrices from './ProductPrices'
import ProductActions from './ProductActions'
import { useConfiguration } from '../../../utils'

export default function ProductTile(props) {
  const { title = '', images = [], manufacturer_title = '', url = '' } = props

  const { getImageLink } = useConfiguration()

  const imageLink = getImageLink({
    source: images[0],
    width: 250,
    format: 'auto',
  })

  return (
    <article className="product-placement-item">
      <Link href={url}>
        <picture className="product-placement-item__image">
          <img data-src={imageLink} alt={title} />
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

        <ProductActions {...props} />
      </Link>
    </article>
  )
}
