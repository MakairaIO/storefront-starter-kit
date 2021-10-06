import { Heading, Copytext, Text, Link } from '../..'
import ProductPrices from './ProductPrices'
import ProductActions from './ProductActions'
import Ribbon from './Ribbon'
import classNames from 'classnames'
import { getProductDetailUrl } from '../../../utils'

export default function ProductTile(props) {
  const {
    title = '',
    picture_url_main = '',
    manufacturer_title = '',
    shortdesc = '',
    url = '',
    mak_paid_placement = false,
    isLazyLoad = true,
    isBundle,
    pageData = {},
  } = props

  const classes = classNames('product-item', {
    ['product-item--highlight']: mak_paid_placement,
  })

  const onClickProduct = (event) => {
    const classes = [...event.target.classList]
    const isButtonClick = classes.some((className) =>
      ['button__text', 'button--primary'].includes(className)
    )

    if (isBundle && isButtonClick) {
      event.preventDefault()
    }
  }

  const productUrl = getProductDetailUrl({ url, pageData })

  return (
    <article className={classes}>
      <Link href={productUrl} onClick={onClickProduct}>
        <picture className="product-item__image">
          {isLazyLoad ? (
            <img data-src={picture_url_main} alt={title} height="228" />
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
