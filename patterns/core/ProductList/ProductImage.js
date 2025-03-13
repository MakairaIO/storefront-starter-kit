import { Image } from '../..'

export default function ProductImage(product) {
  const {
    title = '',
    images = [],
    activeVariant = false,
    picture_url_main = '',
  } = product

  let imageSource = activeVariant ? activeVariant.images[0] : images[0]

  // images array may not always be filled, so fallback to picture_url_main if this is the case
  if (!imageSource) {
    imageSource = picture_url_main
  }

  return (
    <Image
      className="product-item__image"
      alt={title}
      height="228"
      lazyload={activeVariant}
      options={{
        desktop: {
          source: imageSource,
          height: 228,
        },
      }}
    />
  )
}
