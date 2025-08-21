import classNames from 'classnames'
import { Elevation, Text, Icon, Heading, Copytext, ConditionalLink } from '..'
import { useConfiguration } from '../../utils'

function LogoBar(props) {
  const {
    logos = [],
    text = {},
    anchorId = '',
    theme = 'none',
    reduceTopSpace,
    reduceMaxWidth,
    alignment = 'left',
  } = props.data
  const { getImageLink } = useConfiguration()

  const classes = classNames('pattern logo-bar', {
    [`logo-bar__theme-${theme}`]: theme,
    ['logo-bar__reduce-top-space']: reduceTopSpace,
    [`logo-bar__alignment--${alignment}`]: alignment,
  })

  const wrapperClasses = classNames('', {
    'logo-bar__reduce-max-width': reduceMaxWidth,
  })

  return (
    <section id={anchorId} className={classes}>
      <div className={wrapperClasses}>
        <div className="logo-bar__header">
          {text.heading && (
            <Heading level={0} element="h2" className="logo-bar__heading">
              {text.heading}
            </Heading>
          )}
          {text.content && (
            <Copytext
              className="logo-bar__text"
              dangerouslySetInnerHTML={{ __html: text.content }}
            ></Copytext>
          )}
        </div>
        <div className="logo-bar__content">
          {logos.map(({ uuid, image, theme, title, icon, link }) => {
            const classes = classNames(
              'logo-bar__item',
              `logo-bar__item__theme--${theme}`,
              {
                'logo-bar__item--hasTitle': title,
              }
            )
            const imageLink = image.src
              ? getImageLink({ source: image.src })
              : ''

            return (
              <Elevation key={uuid} level={10}>
                <ConditionalLink href={link} className={classes}>
                  <div className="logo-bar__item__wrapper">
                    {!icon && imageLink && (
                      <img src={imageLink} alt={image.alt} />
                    )}
                    {icon && <Icon symbol={icon} />}
                  </div>
                  {title && <Text element="p">{title}</Text>}
                </ConditionalLink>
              </Elevation>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LogoBar
export { default as logoBarVariants } from './variants.js'
