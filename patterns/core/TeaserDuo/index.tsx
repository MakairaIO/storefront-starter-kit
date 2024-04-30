import { ConditionalLink } from '../..'
import Image from './image'
import Title from './title'
import Overlay from './overlay'
import { ImageProps } from '../../../public/assets/type/Image'

type TeaserDescription = {
  heading?: string
  text?: string
}

type TeaserTile = {
  heading?: string
  subheading?: string
  hint?: string
  link?: string
  description?: TeaserDescription
  image: ImageProps
}

type TeaserDuoProps = {
  leftTile: TeaserTile
  rightTile: TeaserTile
}

const TeaserDuo: React.FC<TeaserDuoProps> = ({
  leftTile = {},
  rightTile = {},
}) => {
  return (
    <section className="duo-teaser-box">
      <div className="duo-teaser">
        <ConditionalLink href={leftTile.link} className="duo-teaser__container">
          <div className="duo-teaser__image-wrapper">
            <Image {...leftTile.image} />
            <Title {...leftTile} />
          </div>
          <Overlay {...leftTile.description} showButton={leftTile.link != ''} />
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

export default TeaserDuo
export { default as teaserDuoVariants } from './variants.js'
