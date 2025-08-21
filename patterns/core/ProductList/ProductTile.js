import { Heading, Copytext, Text, Link } from '../..'
import ProductPrices from './ProductPrices'
import ProductActions from './ProductActions'
import Ribbon from './Ribbon'
import classNames from 'classnames'

export default function ProductTile(props) {
  const {
    title = '',
    picture_url_main = '',
    manufacturer_title = '',
    shortdesc = '',
    url = '',
    mak_paid_placement = false,
    isLazyLoad = true,
  } = props

  const classes = classNames('product-item', {
    ['product-item--highlight']: mak_paid_placement,
  })

  return (
    <article className={classes}>
      <Link href={url}>
        <picture className="product-item__image">
          {isLazyLoad ? (
            <img data-src={picture_url_main} alt={title} />
          ) : (
            <img src={picture_url_main} alt={title} />
          )}
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
