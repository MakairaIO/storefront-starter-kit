import { useRef } from 'react'
import { useConfiguration, useLazyLoading } from '../../utils'

export default function Image(props) {
  const { getImageLink } = useConfiguration()
  const pictureRef = useRef(null)
  const { src = '', alt = '' } = props

  const imageLink = getImageLink({
    source: src,
    height: 150,
  })
  const imageLinkRetina = getImageLink({
    source: src,
    height: 150,
    pixelRatio: 2,
  })

  useLazyLoading({ ref: pictureRef, dependency: src })

  return (
    <picture ref={pictureRef} className="">
      <source srcSet={`${imageLink} 1x, ${imageLinkRetina} 2x`} />
      <img src={imageLink} alt={alt} />
    </picture>
  )
}
