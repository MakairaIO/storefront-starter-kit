import { useConfiguration } from '../../../utils'
import Head from 'next/head'

export default function Image(props) {
  const { getImageLink } = useConfiguration()
  const { title = '', images = [] } = props

  const imageLink = getImageLink({
    source: images[0],
    format: 'auto',
    height: 600,
  })

  return (
    <div className="product-detail-information__image">
      <Head>
        <link rel="preload" href={imageLink} as="image" />
      </Head>

      <picture>
        <img src={imageLink} alt={title} />
      </picture>
    </div>
  )
}
