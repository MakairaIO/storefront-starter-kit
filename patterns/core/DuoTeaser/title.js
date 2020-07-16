export default function Title(props) {
  const { heading = '', subheading = '', hint = '' } = props

  return (
    <p className="duo-teaser__title-wrapper">
      {subheading && (
        <span className="duo-teaser__title--sub-heading">{subheading}</span>
      )}
      {heading && <span className="duo-teaser__title--heading">{heading}</span>}
      {hint && <span className="duo-teaser__title--hint">{hint}</span>}
    </p>
  )
}
