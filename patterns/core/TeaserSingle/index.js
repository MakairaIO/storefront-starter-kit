import { useConfiguration } from '../../../utils'
import { Heading, Copytext, Button, ConditionalLink } from '../..'

function TeaserSingle(props) {
  const { getImageLink } = useConfiguration()
  const { heading = '', text = '', image = {}, button = {}, link = '' } = props

  const imageLink = getImageLink({ source: image.src })

  return (
    <section className="single-teaser">
      <ConditionalLink href={link}>
        <picture className="single-teaser__image">
          <img src={imageLink} alt={image.alt} />
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
