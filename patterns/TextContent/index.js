import classNames from 'classnames'

import { Heading, Copytext } from '..'

function TextContent({
  heading,
  content,
  anchorId = '',
  theme = 'none',
  reduceTopSpace,
  reduceMaxWidth,
  alignment,
}) {
  const classes = classNames('pattern text-content', {
    [`text-content__theme--${theme}`]: theme,
    'text-content__reduce-top-space': reduceTopSpace,
    [`text-content__alignment--${alignment}`]: alignment,
  })

  const wrapperClasses = classNames('', {
    'text-content__reduce-max-width': reduceMaxWidth,
  })

  return (
    <section id={anchorId} className={classes}>
      <div className={wrapperClasses}>
        {heading && (
          <Heading className="text-content__heading" level={0}>
            {heading}
          </Heading>
        )}
        <Copytext
          className="text-content__text"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></Copytext>
      </div>
    </section>
  )
}

export default TextContent
export { default as textContentVariants } from './variants.js'
