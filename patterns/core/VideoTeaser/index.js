import { Component } from 'react'
import { Heading, Copytext, ConditionalLink, Text } from '../..'
import StandardButton from './StandardButton'
import BackgroundVideo from './BackgroundVideo'

class VideoTeaser extends Component {
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
                <StandardButton />
              </ConditionalLink>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default VideoTeaser
export { default as videoTeaserVariants } from './variants.js'
