import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import { dispatchShowInformationEvent, useTranslation } from '../../utils'
import ContactForm from './ContactForm'
import classNames from 'classnames'

const REQUIRE_FIELDS = {
  contact: ['firstName', 'lastName', 'email', 'comment'],
  newsletter: ['email'],
  'simple-newsletter': ['email'],
}

function Forms(props) {
  const { type, theme = '', anchorId = '' } = props
  const { t } = useTranslation()

  const [formData, setFormData] = useState({})
  const [requiredFields, setRequiredFields] = useState([])
  const [errors, setErrors] = useState({})
  const [isDirty, setIsDirty] = useState(false)

  const ERROR_MESSAGE =
    'Das Formular konnte leider nicht abgeschickt werden. Bitte überprüfen Sie Ihre Eingabe und versuchen es erneut.'

  const SUCCESS_TYPE_MESSAGES = {
    contact:
      'Vielen Dank für Ihre Anfrage. Wir werden uns zeitnahe bei Ihnen melden.',
    newsletter: t('SUBSCRIBE_NEWSLETTER_SUCCESS_MESSAGE'),
  }

  const classes = classNames('form', {
    [`form--${theme}`]: theme && theme !== '',
  })

  useEffect(() => {
    updateRequiredFields()
  }, [formData])

  useEffect(() => {
    if (isDirty) {
      handleValidation()
    }
  }, [requiredFields])

  function updateRequiredFields() {
    const requiredFields = REQUIRE_FIELDS[type].reduce((acc, field) => {
      if (!formData[field]) {
        acc.push(field)
      }
      return acc
    }, [])

    setRequiredFields(requiredFields)
  }

  function handleValidation() {
    let fields = formData
    let errors = {}

    if (requiredFields.length == 0) {
      setErrors({})
      return
    }

    requiredFields.map((item) => {
      if (!fields[item]) {
        errors[item] = true
      }
      setErrors(errors)

      return isEmpty(errors)
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsDirty(true)
    updateRequiredFields()
    handleValidation()

    if (requiredFields.length > 0) {
      dispatchShowInformationEvent({
        message: ERROR_MESSAGE,
        callBack: null,
      })
    } else {
      submitFormSendGrid(formData)
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        ['agreement', 'subscription'].indexOf(e.target.name) > -1
          ? e.target.checked
          : e.target.value.trim(),
    })
  }

  async function submitFormSendGrid(data = {}) {
    try {
      const response = await fetch(process.env.SHOP_DOMAIN + '/email', {
        method: 'POST',
        body: JSON.stringify({ ...data, type: type }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200) {
        let message = SUCCESS_TYPE_MESSAGES[type] || ''

        dispatchShowInformationEvent({
          message,
          callBack: null,
        })
      }

      if (response.status === 500) {
        dispatchShowInformationEvent({
          message: ERROR_MESSAGE,
          callBack: null,
        })
      }

      const json = await response.json()
      return json
    } catch (error) {
      dispatchShowInformationEvent({
        message: ERROR_MESSAGE,
        callBack: null,
      })
      console.error(error)
    }
  }

  return (
    <section id={anchorId} className={classes}>
      {type === 'contact' && (
        <ContactForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          isDirty={isDirty}
          theme={theme}
        />
      )}
    </section>
  )
}

export default Forms
export { default as formsVariants } from './variants.js'
