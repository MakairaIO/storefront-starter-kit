import { Link } from '..'
import Image from './Image'
import Title from './Title'
import Overlay from './Overlay'

function InnerTeaser(props) {
  const { heading = {}, overlay = {}, image = {} } = props

  return (
    <>
      <div className="hero-teaser__image-wrapper">
        <Image {...image} />

        <Title {...heading} />
      </div>

      <Overlay {...overlay} />
    </>
  )
}

function TeaserHero(props) {
  const { link = '' } = props

  if (link != '') {
    return (
      <section className="hero-teaser">
        <Link href={link} className="hero-teaser__container">
          <InnerTeaser {...props} />
        </Link>
      </section>
    )
  }

  return (
    <section className="hero-teaser">
      <div className="hero-teaser__container">
        <InnerTeaser {...props} />
      </div>
    </section>
  )
}

export default TeaserHero
export { default as teaserHeroVariants } from './variants.js'
