import { Button } from '../..'

type OverlayProps = {
  heading?: string
  text?: string
  showButton?: boolean
}

const Overlay: React.FC<OverlayProps> = ({
  heading = '',
  text = '',
  showButton = false,
}) => {
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

export default Overlay
