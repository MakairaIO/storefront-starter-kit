import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Copytext from '../Copytext/index.js'
import { Heading, BookMeeting } from '../index.js'
import Button from '../Button/index.js'
import { useConfiguration } from '../../utils/index.js'

const mobileImageProps = {
  width: 680,
  quality: 90,
}

const desktopImageProps = {
  width: 880,
  quality: 90,
}

const DESKTOP_BREAKPOINT = 990

function TeaserCarousel(props) {
  const { getImageLink } = useConfiguration()
  const slidePresentationTime = 7000
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageStyle, setImageStyle] = useState({})
  const imageRef = useRef(null)

  const theme = props.theme
  const reduceTopSpace = props.reduceTopSpace
  const reduceMaxWidth = props.reduceMaxWidth
  const meetingLink = props.meeting?.link

  const classes = classNames('pattern pattern teaser-carousel', {
    [`teaser-carousel__theme--${theme}`]: theme,
    ['teaser-carousel__reduce-top-space']: reduceTopSpace,
  })

  const wrapperClasses = classNames('', {
    ['teaser-carousel__reduce-max-width']: reduceMaxWidth,
  })

  useEffect(() => {
    let intervallId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % props.image.length)
    }, slidePresentationTime)

    return () => {
      clearInterval(intervallId)
    }
  }, [currentSlide, props.image.length])

  useEffect(() => {
    window.addEventListener('resize', handleScreenResize)
    return () => {
      window.removeEventListener('resize', handleScreenResize)
    }
  })

  useEffect(() => {
    handleScreenResize()
  }, [])

  function handleScreenResize() {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      if (!imageRef || !imageRef.current) return
      if (isInViewport(imageRef.current)) {
        setImageStyle({ width: 'auto' })
      } else {
        setImageStyle({ width: '100%' })
      }
    } else {
      setImageStyle({})
    }
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  return (
    <section id={props.anchorId || ''} className={classes}>
      <div className={wrapperClasses}>
        <div className="teaser-carousel__container">
          <div className="teaser-carousel__column-left">
            <Heading variant="byline" className="teaser-carousel__subline">
              {props.content.subline}
            </Heading>

            <Heading
              level="0"
              element="h1"
              className="teaser-carousel__headline"
            >
              {props.content.headline}
            </Heading>
            <Copytext
              className="teaser-carousel__simple-text"
              dangerouslySetInnerHTML={{ __html: props.content.text }}
            />

            {props.button.text && (
              <div className="teaser-carousel__column-left__button-wrapper">
                <Button
                  className={classNames(
                    'teaser-carousel_button',
                    props.button.className
                  )}
                  variant="secondary"
                  href={props.button.link}
                >
                  {props.button.text}
                </Button>
              </div>
            )}
            {props.meeting.link && (
              <div className="teaser-carousel__column-left__meeting-wrapper">
                <BookMeeting
                  link={meetingLink}
                  title={props.meeting.text}
                  theme={theme}
                />
              </div>
            )}

            <div className="teaser-carousel__trusties">
              <p>Wir sind TOP RATED bei OMR!</p>
              <div className="teaser-carousel__trusties-items">
                <img
                  src="https://omr.com/de/reviews/widget/productTileLight/makaira.png"
                  alt="OMR Reviews Badge"
                />
                <img
                  src="https://res.cloudinary.com/makaira/image/upload///v1592420992/Makaira%20Website/d0n31quco5hdtbkt5qip.png"
                  alt="OMR TopRated Badge"
                />
              </div>
            </div>
          </div>

          <div className="teaser-carousel__column-right">
            {props.image.map((imageData, index) => {
              const imageLinkMobile = getImageLink({
                source: imageData.src,
                ...mobileImageProps,
              })

              const imageLinkMobileRetina = getImageLink({
                source: imageData.src,
                ...mobileImageProps,
                pixelRatio: 2,
              })

              const imageLinkDesktop = getImageLink({
                source: imageData.src,
                ...desktopImageProps,
              })

              const imageLinkDesktopRetina = getImageLink({
                source: imageData.src,
                ...desktopImageProps,
                pixelRatio: 2,
              })

              const classes = classNames(
                'teaser-carousel__animation-container',
                {
                  'teaser-carousel__animation-container--active':
                    currentSlide === index,
                }
              )

              return (
                <div key={imageData?.src?.fileName} className={classes}>
                  <a href={imageData.link} rel="noreferrer">
                    <picture className="teaser-carousel__media ">
                      <source
                        srcSet={`${imageLinkDesktop} 1x, ${imageLinkDesktopRetina} 2x`}
                      />
                      <source
                        srcSet={`${imageLinkMobile} 1x, ${imageLinkMobileRetina} 2x`}
                      />
                      <img
                        ref={imageRef}
                        style={imageStyle}
                        src={imageLinkDesktop}
                        alt={imageData.alt}
                      />
                    </picture>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeaserCarousel
export { default as teaserCarouselVariants } from './variants.js'
