import { useRef } from 'react'
import { useConfiguration, useLazyLoading } from '../../../utils'
import { Heading, Copytext, Button, ConditionalLink } from '../..'

function TeaserSingle(props) {
  const pictureRef = useRef(null)
  const { getImageLink } = useConfiguration()
  const { image = {}, content = {}, button = {}, link = '' } = props
  const { heading = '', text = '' } = content

  const imageLink = getImageLink({ source: image.src })

  useLazyLoading({ ref: pictureRef, dependency: image.src })

  return (
    <section className="single-teaser">
      <ConditionalLink href={link}>
        <picture ref={pictureRef} className="single-teaser__image">
          <img data-src={imageLink} alt={image.alt} />
        </picture>
      </ConditionalLink>

      <div className="single-teaser__content">
        <Heading>{heading}</Heading>

        <Copytext dangerouslySetInnerHTML={{ __html: text }} />

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
