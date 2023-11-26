import Image from '../Image'

export default function BlogImage(props) {
  const { title, promotionalImage } = props

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

  return (
    <Image
      alt={title}
      lazyload={false}
      preload={true}
      options={{
        desktop: {
          source: promotionalImage,
          height: 450,
        },
      }}
    />
  )
}
