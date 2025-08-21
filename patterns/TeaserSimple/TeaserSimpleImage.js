import classNames from 'classnames'
import { useConfiguration } from '../../utils'
import { Link, Copytext } from '..'
import { useState, useEffect, useRef } from 'react'

const DESKTOP_BREAKPOINT = 1270

export default function TeaserSimpleImage(props) {
  const { image, alignment } = props
  const { caption = {} } = image
  const { getImageLink } = useConfiguration()
  const [imageStyle, setImageStyle] = useState({})
  const imageRef = useRef(null)

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
        setImageStyle({})
      } else {
        setImageStyle({ 'min-width': 'unset' })
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

  if (!image.url) return null

  const imageLink = getImageLink({
    source: image.url,
    width: 800,
    crop: 'fill',
  })

  const captionClasses = classNames('teaser-simple__caption', {
    ['teaser-simple__caption--left']: alignment === 'left',
  })

  return (
    <div className="teaser-simple__text-column teaser-simple__text-column--media">
      <img
        src={imageLink}
        alt={image.alt}
        ref={imageRef}
        style={imageStyle}
        className="teaser-simple__image"
      />
      {caption.text && (
        <Copytext variant="caption" className={captionClasses}>
          {caption.text}
          <Link
            className="teaser-simple__caption--link"
            href={caption.link.url}
          >
            {caption.link.text}
          </Link>
        </Copytext>
      )}
    </div>
  )
}
