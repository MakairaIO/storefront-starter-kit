import Image from '../Image'

export default function BlogImage(props) {
  const { title, promotionalImage } = props

  if (!promotionalImage) {
    return (
      <picture>
        <img
          height={450}
          src="/assets/images/videoTeaser/example.jpg"
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
