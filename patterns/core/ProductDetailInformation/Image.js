import { Image } from '../..'

export default function ProductImage(props) {
  const { title = '', images = [], activeVariant } = props

  const imageSource = activeVariant ? activeVariant.images[0] : images[0]

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
