import { Image } from '../..'

export default function ProductImage(props) {
  const { title = '', images = [], activeVariant, picture_url_main } = props

  let imageSource = activeVariant ? activeVariant.images[0] : images[0]

  // images array may not always be filled, so fallback to picture_url_main if this is the case
  if (!imageSource) {
    imageSource = picture_url_main
  }

  return (
    <Image
      alt={title}
      lazyload={false}
      preload={true}
      options={{
        desktop: {
          source: imageSource,
          height: 600,
        },
      }}
    />
  )
}
