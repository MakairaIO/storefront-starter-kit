import { useRef } from 'react'
import { useConfiguration, useLazyLoading } from '../../utils'

export default function Image(props) {
  const { getImageLink } = useConfiguration()
  const pictureRef = useRef(null)
  const { src = '', alt = '' } = props

  const imageLinkMobile = getImageLink({
    source: src,
    width: 768,
    crop: 'fill',
  })
  const imageLinkMobileRetina = getImageLink({
    source: src,
    width: 768,
    crop: 'fill',
    pixelRatio: 2,
  })

  const imageLinkTablet = getImageLink({
    source: src,
    width: 1366,
    crop: 'fill',
  })
  const imageLinkTabletRetina = getImageLink({
    source: src,
    width: 1366,
    crop: 'fill',
    pixelRatio: 2,
  })

  const imageLinkDesktop = getImageLink({
    source: src,
    width: 1400,
    crop: 'fill',
  })
  const imageLinkDesktopRetina = getImageLink({
    source: src,
    width: 1400,
    crop: 'fill',
    pixelRatio: 2,
  })

  useLazyLoading({ ref: pictureRef, dependency: src })

  return (
    <picture ref={pictureRef} className="simple-opener__image">
      <source
        media="(min-width: 1366px)"
        srcSet={`${imageLinkDesktop} 1x, ${imageLinkDesktopRetina} 2x`}
      />
      <source
        media="(min-width: 768px)"
        srcSet={`${imageLinkTablet} 1x, ${imageLinkTabletRetina} 2x`}
      />
      <source srcSet={`${imageLinkMobile} 1x, ${imageLinkMobileRetina} 2x`} />
      <img src={imageLinkDesktop} alt={alt} />
    </picture>
  )
}
