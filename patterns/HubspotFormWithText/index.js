import classNames from 'classnames'
import { useEffect, useRef } from 'react'

export default function HubspotFormWithText(props) {
  const {
    portalId,
    region,
    formId,
    text,
    textPlacement = 'right',
    theme,
    reduceTopSpace,
    reduceMaxWidth,
  } = props
  const ref = useRef()

  const classes = classNames(
    `pattern hubspot-form-with-text hubspot-form-with-text--text-${textPlacement}`,
    {
      [`hubspot-form-with-text__theme--${theme}`]: theme,
      'hubspot-form-with-text__reduce-top-space': reduceTopSpace,
    }
  )

  const wrapperClasses = classNames('', {
    'hubspot-form-with-text__reduce-max-width': reduceMaxWidth,
  })

  useEffect(() => {
    createScript(
      {
        charset: 'utf-8',
        src: '//js-eu1.hsforms.net/forms/v2.js?pre=1',
        type: 'text/javascript',
      },
      '',
      () => {
        createScript(
          {
            type: 'text/javascript',
          },
          `
          hbspt.forms.create({
            region: "${region}",
            portalId: "${portalId}",
            formId: "${formId}",
            onFormSubmitted: (event) => {
              var formSection = document.querySelector(".hubspot-form-with-text[data-formid=${formId}]");
              if (formSection) {
                document.scrollingElement.scrollTop = formSection.offsetTop - 150
              }
            }
          }); 
        `
        )
        addLoadingSnipper()
      }
    )
  }, [region, portalId, formId])

  function createScript(attributes = {}, innerHTML = '', onload = () => {}) {
    const script = document.createElement('script')
    Object.keys(attributes).forEach((key) => {
      script.setAttribute(key, attributes[key])
    })
    script.innerHTML = innerHTML
    script.onload = onload
    ref.current?.appendChild(script)
    return script
  }

  function addLoadingSnipper() {
    const image = document.createElement('img')
    image.src = '/assets/images/ajax-loader.gif'
    image.height = '80'
    image.alt = 'loading'
    image.classList.add('contact-form__loading')
    ref.current?.appendChild(image)
  }

  return (
    <section className={classes}>
      <div className={wrapperClasses}>
        {text && (
          <div
            className="hubspot-form-with-text__text"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        )}
        <div
          className="hubspot-form-with-text__form"
          ref={ref}
          data-formid={formId}
        ></div>
      </div>
    </section>
  )
}

export { default as hubspotFormWithTextVariants } from './variants.js'
