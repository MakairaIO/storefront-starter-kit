import { useConfiguration } from '../../../utils'

export default function Image(props) {
  const { getImageLink } = useConfiguration()
  const { src = '', alt = '' } = props

  const imageLink = getImageLink({ source: src, format: 'auto' })

  return (
    <picture className="hero-teaser__image">
      <img src={imageLink} alt={alt} loading="lazy" />
    </picture>
  )
}
