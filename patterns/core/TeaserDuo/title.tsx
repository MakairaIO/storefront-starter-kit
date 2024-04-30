type Title = {
  heading?: string
  subheading?: string
  hint?: string
}

const Title: React.FC<Title> = ({
  heading = '',
  subheading = '',
  hint = '',
}) => {
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

export default Title
