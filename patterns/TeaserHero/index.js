import { Heading, Copytext, Button } from '..'

function Image(props) {
  const { src = '', alt = '' } = props

  return (
    <picture className="hero-teaser__image">
      <img src={src} alt={alt} />
    </picture>
  )
}

function Title(props) {
  const { isVisible = false, text = '', pre = '', sub = '' } = props

  if (!isVisible) return null

  return (
    <p className="hero-teaser__title-wrapper">
      {pre && <span className="hero-teaser__title--pre">{pre}</span>}

      <span className="hero-teaser__title--text">{text}</span>

      {sub && <span className="hero-teaser__title--sub">{sub}</span>}
    </p>
  )
}

function Overlay(props) {
  const {
    isVisible = false,
    heading = '',
    text = '',
    button = {},
    link = '',
  } = props

  if (!isVisible) return null

  return (
    <p className="hero-teaser__overlay">
      {heading && (
        <span className="hero-teaser__overlay-heading">{heading}</span>
      )}

      {text && <span className="hero-teaser__overlay-text">{text}</span>}

      {button.isVisible && (
        <Button
          className="hero-teaser__button"
          icon="chevron-right"
          href={link}
        >
          {button.text}
        </Button>
      )}
    </p>
  )
}

function TeaserHero(props) {
  const { heading = {}, overlay = {}, image = {}, link = '' } = props

  return (
    <section className="hero-teaser">
      <div className="hero-teaser__container">
        <div className="hero-teaser__image-wrapper">
          <Image {...image} />

          <Title {...heading} />
        </div>

        <Overlay {...overlay} link={link} />
      </div>
    </section>
  )
}

export default TeaserHero
export { default as teaserHeroVariants } from './variants.js'
