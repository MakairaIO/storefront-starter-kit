import classNames from 'classnames'
import { Copytext, Avatar, UserInfo } from '..'

function Quotes({
  quotes,
  anchorId = '',
  theme,
  reduceTopSpace,
  reduceMaxWidth,
  alignment,
}) {
  const classes = classNames('pattern quotes', {
    [`quotes__theme--${theme}`]: theme,
    'quotes__reduce-top-space': reduceTopSpace,
    [`quotes__alignment--${alignment}`]: alignment,
  })

  const classesWrapper = classNames('', {
    'quotes__reduce-max-width': reduceMaxWidth,
  })

  return (
    <section id={anchorId} className={classes}>
      <div className={classesWrapper}>
        {quotes.map(
          ({ uuid, quote, avatar, name, title, position = 'left' }) => {
            const classes = classNames(`quote quote--${position}`, {
              [`quote__multiple-quotes`]: quotes.length > 1,
            })
            return (
              <div key={uuid} className={classes}>
                <Copytext variant="quote" className="quote__text">
                  {quote}
                </Copytext>
                <div className="quote__user">
                  <Avatar src={avatar} />
                  <UserInfo name={name} title={title} />
                </div>
              </div>
            )
          }
        )}
      </div>
    </section>
  )
}

export default Quotes
export { default as quotesVariants } from './variants.js'
