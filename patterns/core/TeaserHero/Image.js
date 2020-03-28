import { useConfiguration, useLazyLoading } from '../../../utils'

export default function Image(props) {
  const { getImageLink } = useConfiguration()
  const { src = '', alt = '' } = props

  const imageLink = getImageLink({ source: src })

  useLazyLoading({ selector: '.hero-teaser__image', dependency: src })

  return (
    <picture className="hero-teaser__image">
      <img data-src={imageLink} alt={alt} />
    </picture>
  )
}
