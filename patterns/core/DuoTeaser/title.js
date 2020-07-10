export default function Title(props) {
  const { isVisible = false, text = '', pre = '', sub = '' } = props

  if (!isVisible) return null

  return (
    <p className="hero-teaser__title-wrapper">
      {pre && <span className="hero-teaser__title--pre">{pre}</span>}

      <span className="hero-teaser__title--text">{text}</span>

      {sub && <span className="hero-teaser__title--sub">{sub}</span>}
    </p>
  )
}
