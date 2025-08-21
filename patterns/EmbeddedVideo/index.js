import ReactPlayer from 'react-player'
import classNames from 'classnames'

import { Heading, Icon, Copytext, Link } from '..'
import { useConfiguration } from '../../utils'

function EmbeddedVideo(props) {
  const {
    heading = '',
    text = '',
    posterImage = '',
    video = '',
    link = '',
    anchorId = '',
    theme = 'none',
    reduceTopSpace,
    reduceMaxWidth,
    alignment = 'left',
  } = props

  const classes = classNames('pattern embedded-video', {
    [`embedded-video__theme--${theme}`]: theme,
    'embedded-video__reduce-top-space': reduceTopSpace,
    [`embedded-video__alignment--${alignment}`]: alignment,
  })

  const wrapperClasses = classNames('', {
    'embedded-video__reduce-max-width': reduceMaxWidth,
  })

  const { getImageLink } = useConfiguration()

  const imageLink = getImageLink({
    source: posterImage,
    crop: 'fill',
  })

  return (
    <section id={anchorId} className={classes}>
      <div className={wrapperClasses}>
        {heading && (
          <Heading className="embedded-video__heading" level="0">
            {heading}
          </Heading>
        )}

        <Copytext
          className="embedded-video__text"
          dangerouslySetInnerHTML={{ __html: text }}
        ></Copytext>

        <div className="embedded-video__wrapper">
          <ReactPlayer
            className="embedded-video__player"
            url={video}
            width="100%"
            height="100%"
            light={encodeURI(imageLink)}
            playing
            controls
            playIcon={<Icon symbol="play-circle-white" />}
          />
        </div>
        {link && (
          <Copytext size="aphrodite" className="embedded-video__link">
            {'Klick auf das Video, um den YouTube-Player zu laden. '}
            <Link href={link}>{'Link zum Video'}</Link>
          </Copytext>
        )}
      </div>
    </section>
  )
}

export default EmbeddedVideo
export { default as embeddedVideoVariants } from './variants.js'
