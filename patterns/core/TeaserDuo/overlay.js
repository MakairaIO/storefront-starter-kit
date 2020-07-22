import { Button } from '../..'

export default function Overlay(props) {
  const {
    heading = '',
    text = '',
    button = { text: 'Zum Produkt', isVisible: true },
  } = props

  return (
    <p className="duo-teaser__overlay">
      {heading && (
        <span className="duo-teaser__overlay-heading">{heading}</span>
      )}

      {text && <span className="duo-teaser__overlay-text">{text}</span>}

      {button.isVisible && (
        <Button className="duo-teaser__button" icon="chevron-right">
          {button.text}
        </Button>
      )}
    </p>
  )
}
