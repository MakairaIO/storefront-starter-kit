import { Component } from 'react'

class BackgroundVideo extends Component {
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
      <>
        <video loop muted autoPlay onClick={(e) => this.playPause(e)}>
          <source src={this.props.videoURL} type="video/mp4" />
          <source src={this.props.videoURL} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </>
    )
  }
}

export default BackgroundVideo
export { default as backgroundVideoVariants } from './variants.js'
