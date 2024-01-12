import classNames from 'classnames'
import { useConfiguration } from '../../../utils'
import { Copytext, Heading, Button, ConditionalLink } from '../..'

function Content(props) {
  const { heading = '', text = '', link = '' } = props

  if (heading == '' && text == '') return null

  return (
    <div className="teaser-grid__content">
      {heading && (
        <Heading element="span" weight="semi-bold">
          {heading}
        </Heading>
      )}

      {text && <Copytext>{text}</Copytext>}

      {link && <Button variant="icon-only" icon="chevron-right" />}
    </div>
  )
}

export default function Tile(props) {
  const { getImageLink } = useConfiguration()
  const {
    image = {},
    content = {},
    link = '',
    className = '',
    lazyLoadingDeactivated = false,
  } = props
  const { src = '', alt = '' } = image

  const optionsSmall = { source: src, format: 'auto', width: 550 }
  const optionsLarge = { source: src, format: 'auto' }

  const imageLinkSmall = getImageLink(optionsSmall)
  const imageLinkLarge = getImageLink(optionsLarge)

  const classes = classNames('teaser-grid__tile', className)

  return (
    <ConditionalLink href={link} fallbackElement="div" className={classes}>
      <picture>
        <source media="(max-width: 549px)" srcSet={imageLinkSmall} />
        <source media="(min-width: 550px)" srcSet={imageLinkLarge} />
        <img alt={alt} loading={lazyLoadingDeactivated ? 'eager' : 'lazy'} />
      </picture>

      <Content {...content} link={link} />
    </ConditionalLink>
  )
}
