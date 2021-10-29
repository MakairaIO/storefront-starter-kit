import { useRef } from 'react'
import { useConfiguration, useLazyLoading } from '../../../utils'

export default function Image(props) {
  const { getImageLink } = useConfiguration()
  const pictureRef = useRef(null)
  const { src = '', alt = '', isLazyLoad = true } = props

  const imageLink = getImageLink({ source: src })

  useLazyLoading({ ref: pictureRef, dependency: src })

  return (
    <picture ref={pictureRef} className="duo-teaser__image">
      {isLazyLoad ? (
        <img data-src={imageLink} alt={alt} />
      ) : (
        <img src={imageLink} alt={alt} />
      )}
    </picture>
  )
}
