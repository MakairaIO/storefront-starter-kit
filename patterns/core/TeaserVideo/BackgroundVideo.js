import { Component, createRef } from 'react'
import { Icon } from '../..'

class BackgroundVideo extends Component {
  constructor(props) {
    super(props)
    this.buttonRef = createRef()
    this.state = {
      showButton: false,
    }
  }

  playPause = () => {
    if (this.buttonRef.current.paused) {
      this.buttonRef.current.play()
    } else {
      this.buttonRef.current.pause()
    }

    this.setState((prevState) => {
      return {
        showButton: !prevState.showButton,
      }
    })
  }

  render() {
    const { videoUrl = '', poster = '' } = this.props
    const { showButton } = this.state

    return (
      <div className="video-teaser-player">
        <video
          ref={this.buttonRef}
          className="video-teaser__video"
          loop
          muted
          autoPlay
          {...(poster && { poster: poster })}
          onClick={this.playPause}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <span className="video-teaser__play-wrapper" onClick={this.playPause}>
          {showButton ? (
            <Icon symbol="play-circle" className="video-teaser__play-button" />
          ) : null}
        </span>
      </div>
    )
  }
}

export default BackgroundVideo
