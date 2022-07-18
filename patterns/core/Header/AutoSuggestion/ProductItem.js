import { Button, Link, Text } from '../../..'
import { getProductDetailUrl, useConfiguration } from '../../../../utils'

function ProductItem(props) {
  const { getImageLink } = useConfiguration()
  const {
    title = '',
    images = [],
    url = '',
    showRemoveButton,
    onRemoveClick,
  } = props

  const productDetailUrl = getProductDetailUrl({ url })

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
      <Link href={productDetailUrl} className="autosuggest__image">
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
      {showRemoveButton && (
        <Button
          onClick={() => onRemoveClick(props.id)}
          icon="times"
          variant="link"
        />
      )}
    </li>
  )
}

export default ProductItem
