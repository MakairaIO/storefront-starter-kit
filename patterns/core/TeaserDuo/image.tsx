import { useConfiguration } from '../../../utils'
import { ImageProps } from '../../../public/assets/type/Image'

const Image: React.FC<ImageProps> = ({ src = '', alt = '' }) => {
  const { getImageLink } = useConfiguration()

  const imageLink = getImageLink({ source: src, format: 'auto' })

  return (
    <picture className="duo-teaser__image">
      <img src={imageLink} alt={alt} loading="lazy" />
    </picture>
  )
}

export default Image
