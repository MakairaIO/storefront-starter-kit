import { Heading, Copytext, Text, Link } from '../..'
import { getProductDetailUrl } from '../../../utils'
import ProductPrices from './ProductPrices'
import Ribbon from './Ribbon'
import { useState } from 'react'
import classNames from 'classnames'
import ProductImage from './ProductImage'
import ProductSwatches from './ProductSwatches'

export default function ProductTile(props) {
  const {
    title = '',
    manufacturer_title = '',
    shortdesc = '',
    url = '',
    mak_paid_placement = false,
  } = props

  const [activeVariant, setActiveVariant] = useState()

  const classes = classNames('product-item', {
    ['product-item--highlight']: mak_paid_placement,
  })

  const productDetailUrl = getProductDetailUrl({ url })

  return (
    <article className={classes}>
      <Link href={productDetailUrl}>
        <ProductImage {...props} activeVariant={activeVariant} />

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
      </Link>

      <ProductSwatches
        {...props}
        activeVariant={activeVariant}
        setActiveVariant={setActiveVariant}
      />

      <Ribbon isVisible={mak_paid_placement} />
    </article>
  )
}
