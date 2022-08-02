import { useRef } from 'react'
import Slider from 'react-slick'
import { NextArrow, PrevArrow, Heading } from '../..'
import { useLazyLoading, useTranslation } from '../../../utils'
import ProductTile from '../StreamPlacement/ProductTile'

export default function Recommendations({ products = [] }) {
  const { t } = useTranslation()
  const listRef = useRef(null)

  useLazyLoading({ ref: listRef, dependency: products })

  return (
    <div className="cart-modal__content--bottom" ref={listRef}>
      <Heading>{t('RECOMMENDATION_HEADING')}</Heading>

      <Slider
        dots
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        customPaging={(i) => (
          <button title={products[i].title}>
            <span />
          </button>
        )}
        appendDots={(dots) => (
          <div>
            <ul>{dots}</ul>
          </div>
        )}
        className="cart-modal__content--products"
        slidesToShow={Math.min(3, products.length)}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: Math.min(2, products.length),
            },
          },
          {
            breakpoint: 499,
            settings: {
              slidesToShow: Math.min(1, products.length),
            },
          },
        ]}
      >
        {products.map((product) => (
          <ProductTile key={product.ean} {...product} />
        ))}
      </Slider>
    </div>
  )
}
