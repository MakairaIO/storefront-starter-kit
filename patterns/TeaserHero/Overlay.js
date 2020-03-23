import { Button } from '..'

export default function Overlay(props) {
  const {
    isVisible = false,
    heading = '',
    text = '',
    button = {},
    link = '',
  } = props

  if (!isVisible) return null

  return (
    <p className="hero-teaser__overlay">
      {heading && (
        <span className="hero-teaser__overlay-heading">{heading}</span>
      )}

      {text && <span className="hero-teaser__overlay-text">{text}</span>}

      {button.isVisible && (
        <Button
          className="hero-teaser__button"
          icon="chevron-right"
          href={link}
        >
          {button.text}
        </Button>
      )}
    </p>
  )
}
