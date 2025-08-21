import classNames from 'classnames'
import { Button, ConditionalLink, Copytext, Heading, Icon } from '..'
import { useConfiguration } from '../../utils'

function Card({
  theme,
  // elevation = 10,
  href,
  buttonText,
  heading = '',
  text,
  icon,
  image,
  linkTile = false,
  reduceTopSpace,
  reduceMaxWidth,
}) {
  const { getImageLink } = useConfiguration()
  const classes = classNames('pattern card', {
    [`card__theme--${theme}`]: theme,
    'card__reduce-top-space': reduceTopSpace,
  })

  const wrapperClasses = classNames('', {
    'card__reduce-max-width': reduceMaxWidth,
  })

  const cardClasses = classNames('card__item', {
    [`card__background`]: image,
    [`card__nolink`]: !href || linkTile,
    'card--empty': !href && !text && !heading,
  })

  const link = linkTile && href ? href : ''

  return (
    <section className={classes}>
      <div className={wrapperClasses}>
        <ConditionalLink href={link} className="card__container">
          <div className={cardClasses}>
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
            {href && !linkTile && (
              <div className="card__actions">
                <Button variant="link" href={href}>
                  {buttonText}
                </Button>
              </div>
            )}
          </div>
        </ConditionalLink>
      </div>
    </section>
  )
}

export default Card
export { default as cardVariants } from './variants.js'
