import classNames from 'classnames'
import { Heading, Copytext, Button, InputIcon, BookMeeting } from '..'
import isEmpty from 'lodash/isEmpty'

import Image from './Image'

function CTAOpener({
  byline,
  heading,
  text,
  second_button,
  main_button,
  microtext,
  email,
  theme = 'none',
  button = {},
  anchorId = '',
  image = {},
  uuid,
  reduceTopSpace,
  reduceMaxWidth,
  alignment,
  meeting = {},
}) {
  const classes = classNames('pattern ctaopener', {
    [`ctaopener__theme ctaopener__theme--${theme}`]: theme,
    'ctaopener__reduce-top-space': reduceTopSpace,
    [`ctaopener__alignment--${alignment}`]: alignment,
  })

  const classesWrapper = classNames('ctaopener__wrapper', {
    'ctaopener__reduce-max-width': reduceMaxWidth,
  })

  return (
    <section key={uuid} id={anchorId} className={classes}>
      <div className={classesWrapper}>
        {byline && <Heading variant="byline">{byline}</Heading>}
        {heading && <Heading level={0}>{heading}</Heading>}
        <Copytext dangerouslySetInnerHTML={{ __html: text }} />
        {!isEmpty(second_button && main_button) && (
          <div className="ctaopener__actions">
            {!isEmpty(second_button.text) && (
              <Button
                variant={theme === 'white' ? 'secondary' : 'primary'}
                href={second_button.link}
                className={second_button.className}
              >
                {second_button.text}
              </Button>
            )}
            {!isEmpty(main_button.text) && (
              <Button
                variant={theme === 'white' ? 'secondary' : 'primary'}
                href={main_button.link}
                className={main_button.className}
              >
                {main_button.text}
              </Button>
            )}
            {meeting.link && (
              <BookMeeting
                link={meeting.link}
                title={meeting.text}
                theme={theme}
              />
            )}
          </div>
        )}

        {image.src && (
          <div
            className={`ctaopener__image ctaopener__image--${image.position}`}
          >
            <Image {...image} />
          </div>
        )}
        {button.isVisible && !isEmpty(button) && (
          <Button
            variant={theme === 'white' ? 'secondary' : 'primary'}
            color={button.color}
            href={button.link}
            disabled={!button.isVisible}
            className={classNames('cta--trap', button.className)}
            icon=""
          >
            {button.text}
          </Button>
        )}
        {email && (
          <div className="ctaopener__email">
            <InputIcon placeholder="Your email" />
          </div>
        )}

        {isEmpty(second_button && main_button) && meeting.link && (
          <div
            className={`ctaopener__actions ${
              !button.isVisible ? 'ctaopener__actions--no-button' : ''
            }`}
          >
            <BookMeeting
              link={meeting.link}
              title={meeting.text}
              theme={theme}
            />
          </div>
        )}

        {microtext && (
          <Copytext
            dangerouslySetInnerHTML={{ __html: microtext }}
            variant="microtext"
          />
        )}
      </div>
    </section>
  )
}

export default CTAOpener
export { default as cTAOpenerVariants } from './variants.js'
