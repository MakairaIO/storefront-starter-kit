import { Button } from '../..'

export default function Overlay(props) {
  const { heading = '', text = '', showButton = false } = props

  return (
    <p className="duo-teaser__overlay">
      {heading && (
        <span className="duo-teaser__overlay-heading">{heading}</span>
      )}

      {text && <span className="duo-teaser__overlay-text">{text}</span>}

      {showButton && (
        <Button className="duo-teaser__button" icon="chevron-right">
          Zum Produkt
        </Button>
      )}
    </p>
  )
}
