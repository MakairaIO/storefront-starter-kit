import Image from '../Image'

export default function BlogImage(props) {
  const { title, promotionalImage } = props

  if (!promotionalImage) {
    return (
      <picture>
        <img
          height={450}
          src="/assets/images/blog/example.jpg"
          alt={title}
          className="blog-list__image"
        />
      </picture>
    )
  }

  return (
    <Image
      className="blog-list__image"
      alt={title}
      lazyload={false}
      preload={true}
      options={{
        desktop: {
          source: promotionalImage,
          height: 220,
        },
      }}
    />
  )
}
