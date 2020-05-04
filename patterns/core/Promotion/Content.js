import { Copytext, Button } from '../..'

function PromotionButton(props) {
  const { isVisible = false, text = '', link = '' } = props

  if (!isVisible) return null

  return (
    <Button icon="chevron-right" href={link} className="promotion__button">
      {text}
    </Button>
  )
}

export default function Content(props) {
  const { text = '', button = {} } = props

  return (
    <div className="promotion__content-wrapper">
      <Copytext className="promotion__text">{text}</Copytext>

      <PromotionButton {...button} />
    </div>
  )
}
