import { Button } from '..'

export default function TeaserSimpleButton(props) {
  const { text, link, theme, className } = props

  if (!text) return null

  const buttonVariant = theme === 'white' ? 'secondary' : 'primary'

  return (
    <div className="teaser-simple__text-column teaser-simple__text-column--button">
      <Button variant={buttonVariant} href={link} className={className}>
        {text}
      </Button>
    </div>
  )
}
