import { Link, Text } from '../../..'
import { useConfiguration } from '../../../../utils'

function ProductItem(props) {
  const { getImageLink } = useConfiguration()
  const { title = '', images = [], url = '' } = props

  const imageLink = getImageLink({
    source: images[0],
    height: 50,
  })

  const imageLinkRetina = getImageLink({
    source: images[0],
    height: 50,
    pixelRatio: 2,
  })

  return (
    <li className="autosuggest__product-item">
      <Link href={url} className="autosuggest__image">
        <picture>
          <img
            src={imageLink}
            srcSet={`${imageLink} 1x, ${imageLinkRetina} 2x`}
            alt={title}
            height="50"
          />
        </picture>

        <Text size="aphrodite" weight="600" className="">
          {title}
        </Text>
      </Link>
    </li>
  )
}

export default ProductItem
