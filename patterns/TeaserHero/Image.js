export default function Image(props) {
  const { src = '', alt = '' } = props

  return (
    <picture className="hero-teaser__image">
      <img src={src} alt={alt} />
    </picture>
  )
}
