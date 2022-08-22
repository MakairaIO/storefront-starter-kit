import { Image } from '../..'

export default function ProductImage(product) {
  const {
    title = '',
    images = [],
    activeVariant,
    picture_url_main = '',
  } = product

  let imageSource = activeVariant ? activeVariant.images[0] : images[0]

  // images array may not always be filled, so fallback to picture_url_main if this is the case
  if (!imageSource) {
    imageSource = picture_url_main
  }
  {
    /* TODO: Refactor once we use native lazy loading */
  }
  if (activeVariant) {
    return (
      <Image
        className="product-item__image"
        alt={title}
        height="228"
        lazyload={false}
        options={{
          desktop: {
            source: imageSource,
            height: 228,
          },
        }}
      />
    )
  }

  return (
    <Image
      className="product-item__image"
      alt={title}
      height="228"
      options={{
        desktop: {
          source: imageSource,
          height: 228,
        },
      }}
    />
  )
}
