import { CTAOpener } from '..'
import classNames from 'classnames'

function CTATrap({ traps, anchorId = '' }) {
  const classes = classNames('pattern ctatrap', {
    [`ctatrap__theme--${traps[0]?.theme}`]:
      traps[0]?.theme && traps[0]?.theme !== 'none',
    'ctatrap__reduce-top-space': traps[0]?.reduceTopSpace,
  })

  const reduceMaxWidth = traps[0]?.reduceMaxWidth
  const alignment = traps[0]?.alignment

  const classesTrapWrapper = classNames('', {
    'ctatrap__reduce-max-width': reduceMaxWidth,
    [`ctatrap__alignment--${alignment}`]: alignment,
  })

  return (
    <section id={anchorId} className={classes}>
      <div className={classesTrapWrapper}>
        {traps.map(
          ({
            uuid,
            byline,
            heading,
            text,
            second_button,
            main_button,
            microtext,
            email,
            theme,
            button,
            image,
            meeting,
          }) => {
            return (
              <CTAOpener
                key={uuid}
                byline={byline}
                heading={heading}
                text={text}
                second_button={second_button}
                main_button={main_button}
                microtext={microtext}
                email={email}
                theme={theme}
                button={button}
                image={image}
                meeting={meeting}
              />
            )
          }
        )}
      </div>
    </section>
  )
}

export default CTATrap
export { default as cTATrapVariants } from './variants.js'
