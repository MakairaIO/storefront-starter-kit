import { useConfiguration } from '../../../utils'
import Head from 'next/head'

export default function Image(props) {
  const { getImageLink } = useConfiguration()
  const { title = '', images = [], activeVariant } = props

  const imageSource = activeVariant ? activeVariant.images[0] : images[0]

  const imageLink = getImageLink({
    source: images[0],
    format: 'auto',
    height: 600,
  })

  const imageLinkRetina = getImageLink({
    source: imageSource,
    height: 600,
    pixelRatio: 2,
    format: 'auto',
  })

  return (
    <div className="product-detail-information__image">
      <Head>
        <link
          rel="preload"
          href={imageLink}
          as="image"
          imagesrcset={`${imageLink} 1x, ${imageLinkRetina} 2x`}
        />
      </Head>

      <picture>
        <img srcSet={`${imageLink} 1x, ${imageLinkRetina} 2x`} alt={title} />
      </picture>
    </div>
  )
}
