import classNames from 'classnames'
import { Heading, Copytext, Icon, Button } from '..'
import { useConfiguration, getFullUrl } from '../../utils'

function FeatureIcons({
  text = {},
  rows = [],
  anchorId = '',
  theme = 'none',
  reduceTopSpace,
  reduceMaxWidth,
  alignment,
}) {
  const { getImageLink } = useConfiguration()

  const classes = classNames('pattern feature-icons', {
    [`feature-icons__theme--${theme}`]: theme,
    'feature-icons__reduce-top-space': reduceTopSpace,
    [`feature-icons__alignment--${alignment}`]: alignment,
  })

  const wrapperClasses = classNames('', {
    'feature-icons__reduce-max-width': reduceMaxWidth,
  })

  return (
    <section id={anchorId} className={classes}>
      <div className={wrapperClasses}>
        {(text.heading || text.content) && (
          <div className="feature-icons__header">
            {text.heading && (
              <Heading className="feature-icons__heading" level={0}>
                {text.heading}
              </Heading>
            )}
            {text.content && (
              <Copytext
                className="feature-icons__text"
                dangerouslySetInnerHTML={{ __html: text.content }}
              ></Copytext>
            )}
          </div>
        )}
        <div className="feature-icons__grid">
          {rows.map(({ uuid, columns }) => (
            <div key={uuid} className="feature-icons__row">
              {columns.map(
                ({
                  uuid,
                  icon = {},
                  image = {},
                  text = {},
                  link = '',
                  linkText = '',
                }) => (
                  <div key={uuid} className="feature-icons__column">
                    {(icon.symbol || image.url) && (
                      <aside>
                        {icon.symbol && <Icon symbol={icon.symbol} />}
                        {image.url && (
                          <img
                            src={getImageLink({ source: image.url })}
                            alt={image.alt}
                          />
                        )}
                      </aside>
                    )}
                    <div className="feature-icons__column__content">
                      <Heading className="feature-icons__heading" level={3}>
                        {text.heading}
                      </Heading>
                      {text.content && (
                        <Copytext
                          className="feature-icons__text"
                          dangerouslySetInnerHTML={{ __html: text.content }}
                        ></Copytext>
                      )}
                      {link && (
                        <Button
                          className="feature-icons__link"
                          variant="link"
                          href={getFullUrl(link).fullUrl}
                        >
                          {linkText}
                        </Button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureIcons
export { default as featureIconsVariants } from './variants.js'
