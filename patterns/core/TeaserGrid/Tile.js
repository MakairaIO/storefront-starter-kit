import classNames from 'classnames'
import { useConfiguration } from '../../../utils'
import { Copytext, Heading, Button, ConditionalLink } from '../..'

function Content(props) {
  const { headline = '', text = '', link = '' } = props

  if (headline == '' && text == '') return null

  return (
    <div className="teaser-grid__content">
      {headline && (
        <Heading size="110" element="span">
          {headline}
        </Heading>
      )}

      {text && <Copytext size="110">{text}</Copytext>}

      {link && <Button variant="icon-only" icon="chevron-right" />}
    </div>
  )
}

export default function Tile(props) {
  const { getImageLink } = useConfiguration()
  const { image = {}, content = {}, link = '', className = '' } = props
  const { src = '', alt = '' } = image

  const imageLink = getImageLink({ source: src })

  const classes = classNames('teaser-grid__tile', className)

  return (
    <ConditionalLink href={link} fallbackElement="div" className={classes}>
      <picture>
        <img data-src={imageLink} alt={alt} />
      </picture>

      <Content {...content} link={link} />
    </ConditionalLink>
  )
}
