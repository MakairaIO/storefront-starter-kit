import React from 'react'
import { Heading, Copytext, ConditionalLink, Text, Button } from '../..'
import BackgroundVideo from './BackgroundVideo'
import { useTranslation } from '../../../utils'

interface TeaserVideoProps {
  heading?: string
  subheading?: string
  hint?: string
  link?: string
  description?: {
    heading?: string
    text?: string
  }
  videoUrl?: string
  poster?: string
}

const TeaserVideo: React.FC<TeaserVideoProps> = ({
  heading = '',
  subheading = '',
  hint = '',
  link = '',
  description,
  videoUrl,
  poster,
}) => {
  const { t } = useTranslation()

  return (
    <section className="video-teaser">
      <BackgroundVideo videoUrl={videoUrl} poster={poster} />
      <div className="video-teaser__content">
        <div className="video-teaser__heading">
          <Text weight="bold" className="video-teaser__sub-heading">
            {subheading}
          </Text>

          <Heading weight="semi-bold">{heading}</Heading>

          <Text weight="bold" className="video-teaser__hint">
            {hint}
          </Text>
        </div>
        <Heading weight="semi-bold">{description.heading}</Heading>
        <Copytext dangerouslySetInnerHTML={{ __html: description.text }} />

        <div className="video-teaser__buy-box">
          {link && (
            <ConditionalLink href={link}>
              <Button className="text--bold" icon="chevron-right">
                {t('PRODUCT_TILE_TO_PRODUCT')}
              </Button>
            </ConditionalLink>
          )}
        </div>
      </div>
    </section>
  )
}

export default TeaserVideo
export { default as teaserVideoVariants } from './variants.js'
