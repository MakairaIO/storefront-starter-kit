import { Link, Text } from '../../..'
import { useRef } from 'react'
import { useLazyLoading } from '../../../../utils'

function ProductItem(props) {
  const [href = '', src = '', title = ''] = [
    props.url,
    props.picture_url_main,
    props.title,
  ]
  const pictureRef = useRef(null)

  useLazyLoading({ ref: pictureRef, dependency: src })

  return (
    <li className="autosuggest__product-item">
      <Link href={href} className="autosuggest__image">
        <picture ref={pictureRef}>
          <img data-src={src} alt={title} />
        </picture>

        <Text size="aphrodite" weight="600" className="">
          {title}
        </Text>
      </Link>
    </li>
  )
}

export default ProductItem
