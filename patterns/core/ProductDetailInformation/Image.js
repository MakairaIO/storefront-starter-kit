import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from 'react-image-magnifiers'

import { Button } from '../..'
import { useConfiguration } from '../../../utils'

export default function Image(props) {
  const {
    title = '',
    picture_url_main = '',
    magnifier_type = 'glass',
    images = [],
  } = props

  const { getImageLink } = useConfiguration()

  const productImage = getImageLink({
    source: images.length > 0 ? images[0] : picture_url_main,
    format: 'auto',
    height: 600,
  })

  return (
    <div className="product-detail-information__image">
      {magnifier_type === 'tap' && (
        <Magnifier
          imageSrc={productImage}
          imageAlt={title}
          largeImageSrc={productImage}
          mouseActivation={MOUSE_ACTIVATION.CLICK} // Optional
          touchActivation={TOUCH_ACTIVATION.TAP} // Optional
        />
      )}

      {magnifier_type === 'glass' && (
        <GlassMagnifier
          magnifierSize={'40%'}
          square={true}
          imageSrc={productImage}
          imageAlt={title}
          largeImageSrc={productImage}
        />
      )}

      {magnifier_type === 'side_by_side' && (
        <SideBySideMagnifier
          imageSrc={productImage}
          imageAlt={title}
          largeImageSrc={productImage}
          alwaysInPlace={false}
          overlayOpacity={0.6}
          switchSides={false}
          zoomPosition="left"
          zoomContainerBorder="1px solid #ccc"
          fillAvailableSpace={false}
          fillAlignTop={false}
          fillGapLeft={0}
          fillGapRight={10}
          fillGapTop={10}
          fillGapBottom={1}
        />
      )}

      <Button
        icon="search"
        variant="icon-only"
        className="product-detail-information__image-button"
      />
    </div>
  )
}
