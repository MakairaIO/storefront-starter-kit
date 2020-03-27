import { Heading, Copytext, Button, ConditionalLink } from '../..'

function TeaserSingle(props) {
  const { heading = '', text = '', image = {}, button = {}, link = '' } = props

  return (
    <section className="single-teaser">
      <ConditionalLink href={link}>
        <picture className="single-teaser__image">
          <img src={image.src} alt={image.alt} />
        </picture>
      </ConditionalLink>

      <div className="single-teaser__content">
        <Heading>{heading}</Heading>

        <Copytext>{text}</Copytext>

        {button.isVisible && (
          <Button href={link} className="single-teaser__button">
            {button.text}
          </Button>
        )}
      </div>
    </section>
  )
}

export default TeaserSingle
export { default as teaserSingleVariants } from './variants.js'
