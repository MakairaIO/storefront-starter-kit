import { Component } from 'react'
import { Heading, Copytext, ConditionalLink, Text } from '../..'
import StandardButton from './standardButton'
import BackgroundVideo from './backgroundVideo'

class VideoTeaser extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section className="video-teaser">
        <BackgroundVideo videoURL={this.props.videoUrl} />

        <div className="video-teaser__heading">
          <Text weight="bold" className="video-teaser__sub-heading">
            {this.props.subheading}
          </Text>

          <Heading weight="semi-bold">{this.props.heading}</Heading>
          <Text weight="bold" className="video-teaser__hint">
            {this.props.hint}
          </Text>
        </div>

        <div className="video-teaser__content">
          <Heading weight="semi-bold">{this.props.description.heading}</Heading>
          <Copytext
            dangerouslySetInnerHTML={{ __html: this.props.description.text }}
          />

          <div className="video-teaser__buy-box">
            <Text weight="bold" className="video-teaser__buy-box-hint">
              {this.props.hint}
            </Text>

            {this.props.link && (
              <ConditionalLink href={this.props.link}>
                <StandardButton />
              </ConditionalLink>
            )}
          </div>
        </div>

        <Text weight="bold" className="video-teaser__hint">
          {this.props.hint}
        </Text>
      </section>
    )
  }
}

export default VideoTeaser
export { default as videoTeaserVariants } from './variants.js'
