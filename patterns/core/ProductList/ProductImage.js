import { useConfiguration } from '../../../utils'

export default function ProductImage(product) {
  const { title = '', images = [], activeVariant } = product

  const { getImageLink } = useConfiguration()

  const imageSource = activeVariant ? activeVariant.images[0] : images[0]

  const imageLink = getImageLink({
    source: imageSource,
    height: 228,
    format: 'auto',
  })

  const imageLinkRetina = getImageLink({
    source: imageSource,
    height: 228,
    pixelRatio: 2,
    format: 'auto',
  })

  {
    /* TODO: Refactor once we use native lazy loading */
  }
  if (activeVariant) {
    return (
      <picture className="product-item__image">
        <img
          srcSet={`${imageLink} 1x, ${imageLinkRetina} 2x`}
          alt={title}
          height="228"
        />
      </picture>
    )
  }

  return (
    <picture className="product-item__image">
      <img
        data-srcset={`${imageLink} 1x, ${imageLinkRetina} 2x`}
        alt={title}
        height="228"
      />
    </picture>
  )
}
