import React, { useRef, useState } from 'react'
import { Icon } from '../..'

type VideoProps = {
  videoUrl?: string
  poster?: string
}

const BackgroundVideo: React.FC<VideoProps> = ({
  videoUrl = '',
  poster = '',
}) => {
  const buttonRef = useRef<HTMLVideoElement>(null)
  const [showButton, setShowButton] = useState<boolean>(false)

  const playPause = () => {
    if (buttonRef.current?.paused) {
      buttonRef.current?.play()
    } else {
      buttonRef.current?.pause()
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
export default BackgroundVideo
