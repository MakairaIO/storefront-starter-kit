import { useState } from 'react'
import classNames from 'classnames'
import { Heading, Copytext, Text, Link } from '../..'
import ProductImage from './ProductImage'
import Ribbon from './Ribbon'
import ProductPrices from './ProductPrices'
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

  return (
    <article className={classes}>
      <Link href={url}>
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
