import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from 'react-image-magnifiers'

import { Button } from '..'

export default function Image(props) {
  const { title = '', picture_url_main = '', magnifier_type = 'tap' } = props

  return (
    <div className="product-detail-information__image">
      {magnifier_type === 'tap' && (
        <Magnifier
          imageSrc={picture_url_main}
          imageAlt={title}
          largeImageSrc={picture_url_main}
          mouseActivation={MOUSE_ACTIVATION.CLICK} // Optional
          touchActivation={TOUCH_ACTIVATION.TAP} // Optional
        />
      )}

      {magnifier_type === 'glass' && (
        <GlassMagnifier
          magnifierSize={'40%'}
          square={true}
          imageSrc={picture_url_main}
          imageAlt={title}
          largeImageSrc={picture_url_main}
        />
      )}

      {magnifier_type === 'side_by_side' && (
        <SideBySideMagnifier
          imageSrc={picture_url_main}
          imageAlt={title}
          largeImageSrc={picture_url_main}
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
