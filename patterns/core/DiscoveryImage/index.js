import React from 'react'
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

class DiscoveryImage extends React.Component {
  state = {
    slideIndex: 0,
    centerPadding: 80,
  }

  constructor(props) {
    super(props)
    this.diRef = React.createRef()
  }

  componentDidMount() {
    if (this.diRef && this.diRef.current) {
      // calculation of centerPadding parameter for react-slick
      // to make padding between 2 product equal to 20px
      // 680 equal to 500px of discovery image container plus 180px of product item
      const currentOffset = this.diRef.current.offsetWidth
      const productWidth = currentOffset < 768 ? 180 : 680
      const centerPadding = (currentOffset - productWidth) / 2 - 10
      this.setState({ centerPadding: centerPadding <= 0 ? 150 : centerPadding })
    }
  }

  render() {
    const { discoveryImage } = this.props
    const { image = '', spots = [] } = discoveryImage
    const { slideIndex, centerPadding } = this.state

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
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
    }

    return (
      <section ref={this.diRef} className="discovery-image">
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
                onClick={() => this.slider.slickGoTo(i)}
              >
                {i + 1}
              </span>
            )
          })}
        </div>

        <div className="products">
          {spots.length > 1 ? (
            <Slider ref={(ref) => (this.slider = ref)} {...settings}>
              {spots.map((spot, i) => {
                return (
                  <ProductTile
                    key={`spot-${i}`}
                    {...spot.product[0]}
                    isLazyLoad={false}
                  >
                    <span className="spot product-spot-index">{i + 1}</span>
                  </ProductTile>
                )
              })}
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
}

export default DiscoveryImage
export { default as discoveryImageVariants } from './variants.js'
