import { Heading, Copytext, Text, Link } from '../..'
import { useConfiguration } from '../../../utils'
import ProductPrices from './ProductPrices'
import ProductActions from './ProductActions'
import Ribbon from './Ribbon'
import classNames from 'classnames'

export default function ProductTile(props) {
  const { getImageLink } = useConfiguration()
  const {
    title = '',
    images = [],
    manufacturer_title = '',
    shortdesc = '',
    url = '',
    mak_paid_placement = false,
  } = props

  const classes = classNames('product-item', {
    ['product-item--highlight']: mak_paid_placement,
  })

  const imageLink = getImageLink({
    source: images[0],
    height: 228,
    format: 'auto',
  })

  const imageLinkRetina = getImageLink({
    source: images[0],
    height: 228,
    pixelRatio: 2,
    format: 'auto',
  })

  return (
    <article className={classes}>
      <Link href={url}>
        <picture className="product-item__image">
          <img
            //src={imageLink}
            data-srcset={`${imageLink} 1x, ${imageLinkRetina} 2x`}
            alt={title}
            height="228"
          />
        </picture>

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

        <ProductActions {...props} />
      </Link>

      <Ribbon isVisible={mak_paid_placement} />
    </article>
  )
}
