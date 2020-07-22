import { Component } from 'react'
import { Heading, Copytext, ConditionalLink, Text, Button } from '../..'
import BackgroundVideo from './BackgroundVideo'
import { useTranslation } from '../../../utils'

class TeaserVideo extends Component {
  render() {
    const {
      heading = '',
      subheading = '',
      hint = '',
      link = '',
      description = {},
    } = this.props

    return (
      <section className="video-teaser">
        <BackgroundVideo {...this.props} />
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
                  <ButtonText />
                </Button>
              </ConditionalLink>
            )}
          </div>
        </div>
      </section>
    )
  }
}

function ButtonText() {
  const { t } = useTranslation()
  return <>{t('PRODUCT_TILE_TO_PRODUCT')}</>
}

export default TeaserVideo
export { default as teaserVideoVariants } from './variants.js'
