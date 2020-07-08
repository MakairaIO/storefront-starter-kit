import { Component } from 'react'
import { Heading, Copytext, Button, ConditionalLink, Text } from '../..'

class VideoTeaser extends Component {
  constructor(props) {
    super(props)
  }
  playPause = (e) => {
    if (e.currentTarget.paused) {
      e.currentTarget.play()
    } else {
      e.currentTarget.pause()
    }
  }

  render() {
    return (
      <section className="video-teaser">
        <ConditionalLink href={this.props.link} className="video-teaser__video">
          <video loop muted autoPlay onClick={(e) => this.playPause(e)}>
            <source src={this.props.videoUrl} type="video/mp4" />
            <source src={this.props.videoUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </ConditionalLink>

        <div className="video-teaser__content">
          {/* <h2 weight="semi-bold">{this.props.subheading}</h2> */}

          <Text
            size="zero"
            weight="bold"
            className="product-item__manufacturer"
          >
            {this.props.subheading}
          </Text>

          <Heading weight="semi-bold">{this.props.heading}</Heading>

          <Copytext
            dangerouslySetInnerHTML={{ __html: this.props.description }}
          />

          {this.props.button.isVisible && (
            <Button
              href={this.props.link}
              className="video-teaser__button"
              icon="chevron-right"
            >
              {this.props.button.text}
            </Button>
          )}
        </div>
      </section>
    )
  }
}

// import BackgroundVideo from '../BackgroundVideo'
// function VideoTeaser(props) {

//   const { videoUrl = '', heading = '', subheading = '', link = '', description = '', button = {}} = props

//   return (
//     <section className="video-teaser">
//       <ConditionalLink href={link} className="video-teaser__image">
//         {/* <BackgroundVideo videoURL={videoUrl} /> */}

//         <video loop muted autoPlay onClick={(e) => this.playPause(e)}>
//             <source src={videoUrl} type="video/mp4" />
//             <source src={videoUrl} type="video/ogg" />
//             Your browser does not support the video tag.
//         </video>
//       </ConditionalLink>

//       <div className="video-teaser__content">
//         <h2 weight="semi-bold">{subheading}</h2>
//         <Heading weight="semi-bold">{heading}</Heading>

//         <Copytext dangerouslySetInnerHTML={{ __html: description }} />

//         {button.isVisible && (
//           <Button
//             href={link}
//             className="video-teaser__button"
//             icon="chevron-right"
//           >
//             {button.text}
//           </Button>
//         )}
//       </div>
//     </section>
//   )
// }

export default VideoTeaser
export { default as videoTeaserVariants } from './variants.js'
