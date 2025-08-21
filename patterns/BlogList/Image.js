import { useConfiguration } from '../../utils'

export default function BlogImage(props) {
  const { title, promotionalImage } = props
  const { getImageLink } = useConfiguration()

  if (!promotionalImage) {
    return (
      <picture className="blog-list__image">
        <img height={450} src="/assets/images/blog/example.jpg" alt={title} />
      </picture>
    )
  }

  const imageLink = getImageLink({ source: promotionalImage })

  return (
    <picture className="blog-list__image">
      <img alt={title} src={imageLink} />
    </picture>
  )
}
