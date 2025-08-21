import classNames from 'classnames'
import { Button, ConditionalLink, Copytext, Heading, Icon } from '../..'
import { useConfiguration } from '../../../utils'

function Card({
  href,
  buttonText,
  heading = '',
  text,
  icon,
  image,
  linkTile = false,
}) {
  const { getImageLink } = useConfiguration()

  const cardClasses = classNames('card__item', {
    [`card__background`]: image,
    [`card__nolink`]: !href || linkTile,
    'card--empty': !href && !text && !heading,
  })

  const link = linkTile && href ? href : ''

  return (
    <ConditionalLink href={link}>
      <div className={cardClasses}>
        <div>
          {image && (
            <div
              className="card__image"
              style={{
                backgroundImage: `url("${getImageLink({ source: image })}")`,
              }}
            ></div>
          )}
          {!image && icon && <Icon symbol={icon} />}
          <Heading level={6}>{heading}</Heading>
          {text && <Copytext dangerouslySetInnerHTML={{ __html: text }} />}
        </div>
        {href && !linkTile && (
          <div className="card__actions">
            <Button variant="link" href={href}>
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </ConditionalLink>
  )
}

export default Card
export { default as cardVariants } from './variants.js'
