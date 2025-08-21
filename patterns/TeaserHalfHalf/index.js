import isEmpty from 'lodash/isEmpty'
import ReactPlayer from 'react-player'
import { Heading, Copytext, Button, Icon } from '..'
import { useConfiguration } from '../../utils'

function TeaserHalfHalf(props) {
  const {
    heading = '',
    headingAlignment = 'left',
    textColumn,
    mediaColumn,
    columnAlignment = 'text-media',
    anchorId = '',
  } = props
  const { getImageLink } = useConfiguration()

  let imageLink = ''
  let posterLink = ''

  if (mediaColumn?.image) {
    imageLink = getImageLink({
      source: mediaColumn.image.url,
      crop: 'fill',
    })
  }

  if (mediaColumn?.video?.posterImage) {
    posterLink = getImageLink({
      source: mediaColumn.video.posterImage,
      crop: 'fill',
    })
  }

  return (
    <section
      id={anchorId}
      className={`teaser-haft-haft teaser-haft-haft--${columnAlignment}`}
    >
      {textColumn && (
        <Heading
          className={`teaser-haft-haft__heading content--${headingAlignment}`}
          level="2"
        >
          {heading}
        </Heading>
      )}

      <div
        className={`teaser-haft-haft__columns teaser-haft-haft__columns--${columnAlignment}`}
      >
        {!isEmpty(textColumn) && (
          <div className="teaser-haft-haft__column teaser-haft-haft__column-text">
            {textColumn.text && (
              <Copytext
                className={`teaser-haft-haft__text content--${textColumn.textAlignment}`}
                dangerouslySetInnerHTML={{ __html: textColumn.text }}
              ></Copytext>
            )}
            {!isEmpty(textColumn.button) && textColumn?.button?.text && (
              <div className={`content--${textColumn.buttonAlignment}`}>
                <Button
                  className="teaser-haft-haft__button"
                  variant="primary"
                  href={textColumn?.button?.link}
                >
                  {textColumn.button.text}
                </Button>
              </div>
            )}
          </div>
        )}

        {!isEmpty(mediaColumn) && (
          <div
            className={`teaser-haft-haft__column teaser-haft-haft__column-media content--${mediaColumn.mediaAlignment}`}
          >
            {mediaColumn.mediaType === 'image' && imageLink && (
              <img
                src={imageLink}
                alt={mediaColumn?.image?.alt}
                className="teaser-haft-haft__image"
              />
            )}
            {mediaColumn.mediaType === 'video' && (
              <div className="embedded-video__wrapper">
                <ReactPlayer
                  className="embedded-video__player"
                  url={mediaColumn.video.src}
                  width="100%"
                  height="100%"
                  light={encodeURI(posterLink)}
                  playing
                  controls
                  playIcon={<Icon symbol="play-circle-white" />}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default TeaserHalfHalf
export { default as teaserHaftHaftVariants } from './variants.js'
