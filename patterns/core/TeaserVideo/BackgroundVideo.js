import { createRef, useState } from 'react'
import { Icon } from '../..'

export default function BackgroundVideo({ videoUrl = '', poster = '' }) {
  const buttonRef = createRef()
  const [showButton, setShowButton] = useState(false)

  const playPause = () => {
    if (buttonRef.current.paused) {
      buttonRef.current.play()
    } else {
      buttonRef.current.pause()
    }
    setShowButton(!showButton)
  }
  return (
    <div className="video-teaser-player">
      <video
        ref={buttonRef}
        className="video-teaser__video"
        loop
        muted
        autoPlay
        {...(poster && { poster: poster })}
        onClick={playPause}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <span className="video-teaser__play-wrapper" onClick={playPause}>
        {showButton ? (
          <Icon symbol="play-circle" className="video-teaser__play-button" />
        ) : null}
      </span>
    </div>
  )
}
