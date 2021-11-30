import { Link, Text } from '../../..'
import { useRef } from 'react'
import { useConfiguration, useLazyLoading } from '../../../../utils'

function ProductItem(props) {
  const [href = '', src = '', title = '', images = []] = [
    props.url,
    props.picture_url_main,
    props.title,
    props.images,
  ]
  const pictureRef = useRef(null)

  const { getImageLink } = useConfiguration()
  useLazyLoading({ ref: pictureRef, dependency: src })

  const productImage = getImageLink({
    source: images.length > 0 ? images[0] : src,
    height: 50,
  })

  return (
    <li className="autosuggest__product-item">
      <Link href={href} className="autosuggest__image">
        <picture ref={pictureRef}>
          <img data-src={productImage} alt={title} />
        </picture>

        <Text size="aphrodite" weight="600" className="">
          {title}
        </Text>
      </Link>
    </li>
  )
}

export default ProductItem
