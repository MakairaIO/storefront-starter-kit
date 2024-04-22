import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'

import { useConfiguration } from '../../../utils'
import ProductTile from '../ProductList/ProductTile'

const ProductImage = ({ image }) => {
  const { getImageLink } = useConfiguration()
  const imageLink = getImageLink({ source: image })

  return (
    <img className="product-image" src={imageLink} alt={'Discovery Image'} />
  )
}

const DiscoveryImage = ({ discoveryImage }) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [centerPadding, setCenterPadding] = useState(80)
  const diRef = useRef(null)
  const sliderRef = useRef(null)

  useEffect(() => {
    if (diRef.current) {
      // calculation of centerPadding parameter for react-slick
      // to make padding between 2 product equal to 20px
      // 680 equal to 500px of discovery image container plus 180px of product item
      const currentOffset = diRef.current.offsetWidth
      const productWidth = currentOffset < 768 ? 180 : 680
      const newCenterPadding = (currentOffset - productWidth) / 2 - 10
      setCenterPadding(newCenterPadding <= 0 ? 150 : newCenterPadding)
    }
  }, [])

  const handleBeforeChange = (current, next) => {
    setSlideIndex(next)
  }

  const handleSpotClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index)
    }
  }

  const { image = '', spots = [] } = discoveryImage

  const settings = {
    className: 'center',
    centerMode: true,
    centerPadding: `${centerPadding}px`,
    focusOnSelect: true,
    slidesToShow: 1,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    beforeChange: handleBeforeChange,
  }

  return (
    <section ref={diRef} className="discovery-image">
      <div className="spots">
        <ProductImage image={image} />
        {spots.map((spot, i) => {
          const spotClasses = classNames('spot', {
            ['spot__active']: slideIndex === i,
          })
          return (
            <span
              className={spotClasses}
              style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
              key={`spot-index-${i}`}
              onClick={() => handleSpotClick(i)}
            >
              {i + 1}
            </span>
          )
        })}
      </div>

      <div className="products">
        {spots.length > 1 ? (
          <Slider ref={sliderRef} {...settings}>
            {spots.map((spot, i) => (
              <ProductTile
                key={`spot-${i}`}
                {...spot.product[0]}
                isLazyLoad={false}
              >
                <span className="spot product-spot-index">{i + 1}</span>
              </ProductTile>
            ))}
          </Slider>
        ) : (
          <div className="slick-active">
            <ProductTile {...spots[0]?.product[0]} isLazyLoad={false}>
              <span className="spot product-spot-index">1</span>
            </ProductTile>
          </div>
        )}
      </div>
    </section>
  )
}

export default DiscoveryImage
export { default as discoveryImageVariants } from './variants.js'
