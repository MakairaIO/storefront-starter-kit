import { useConfiguration } from '../../utils'

export default function BlogImage(props) {
  const { title, promotionalImage } = props
  const { getImageLink } = useConfiguration()

  if (!promotionalImage) {
    return (
      <picture>
        <img
          src="/assets/images/blog/example.jpg"
          alt={title}
          className="blog-detail__image"
        />
      </picture>
    )
  }

  const imageLink = getImageLink({ source: promotionalImage })

  return (
    <picture className="blog-detail__image">
      <img alt={title} src={imageLink} />
    </picture>
  )
}
