import { ConditionalLink } from '..'
import Image from './Image'
import Title from './Title'
import Overlay from './Overlay'

function TeaserHero(props) {
  const { heading = {}, overlay = {}, image = {}, link = '' } = props

  return (
    <section className="hero-teaser">
      <ConditionalLink href={link} className="hero-teaser__container">
        <div className="hero-teaser__image-wrapper">
          <Image {...image} />

          <Title {...heading} />
        </div>

        <Overlay {...overlay} />
      </ConditionalLink>
    </section>
  )
}

export default TeaserHero
export { default as teaserHeroVariants } from './variants.js'
