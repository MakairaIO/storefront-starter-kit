import { useRef } from 'react'
import { useConfiguration, useLazyLoading } from '../../../utils'
import { Heading, Copytext, Button, ConditionalLink } from '../..'

function TeaserSingle(props) {
  const pictureRef = useRef(null)
  const { getImageLink } = useConfiguration()
  const {
    image = {},
    content = {},
    button = {},
    link = '',
    isLazyLoad = true,
  } = props
  const { heading = '', text = '' } = content

  const imageLink = getImageLink({ source: image.src })

  useLazyLoading({ ref: pictureRef, dependency: image.src })

  return (
    <section className="single-teaser">
      <ConditionalLink href={link} className="single-teaser__image">
        <picture ref={pictureRef}>
          {isLazyLoad ? (
            <img data-src={imageLink} alt={image.alt} />
          ) : (
            <img src={imageLink} alt={image.alt} />
          )}
        </picture>
      </ConditionalLink>

      <div className="single-teaser__content">
        <Heading weight="semi-bold">{heading}</Heading>

        <Copytext dangerouslySetInnerHTML={{ __html: text }} />

        {button.isVisible && (
          <Button
            href={link}
            className="single-teaser__button"
            icon="chevron-right"
          >
            {button.text}
          </Button>
        )}
      </div>
    </section>
  )
}

export default TeaserSingle
export { default as teaserSingleVariants } from './variants.js'
