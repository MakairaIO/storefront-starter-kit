import { Component } from 'react'
import { ConditionalLink } from '../..'
import Image from './image'
import Title from './title'
import Overlay from './overlay'
class TeaserDuo extends Component {
  render() {
    const { leftTile = {}, rightTile = {} } = this.props

    return (
      <section className="duo-teaser-box">
        <div className="duo-teaser">
          <ConditionalLink
            href={leftTile.link}
            className="duo-teaser__container"
          >
            <div className="duo-teaser__image-wrapper">
              <Image {...leftTile.image} />
              <Title {...leftTile} />
            </div>
            <Overlay
              {...leftTile.description}
              showButton={leftTile.link != ''}
            />
          </ConditionalLink>
        </div>

        <div className="duo-teaser duo-teaser--right">
          <ConditionalLink
            href={rightTile.link}
            className="duo-teaser__container"
          >
            <div className="duo-teaser__image-wrapper">
              <Image {...rightTile.image} />
              <Title {...rightTile} />
            </div>
            <Overlay
              {...rightTile.description}
              showButton={rightTile.link != ''}
            />
          </ConditionalLink>
        </div>
      </section>
    )
  }
}

export default TeaserDuo
export { default as teaserDuoVariants } from './variants.js'
