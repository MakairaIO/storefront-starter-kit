import React, { useState } from 'react'

import { Heading, Button } from '../..'
import FormField from './FormField'
import FormSelect from './FormSelect'
import FormInput from './FormInput'
import FormTextArea from './FormTextArea'
import FormStatus from './FormStatus'

import { useTranslation } from '../../../utils'

function ContactForm(props) {
  const { recipient } = props
  const { t } = useTranslation()
  const [sentStatus, setSentStatus] = useState(null)

  const genderOptions = [
    {
      value: t('CONTACT_FORM_SALUTATION_MALE'),
      label: t('CONTACT_FORM_SALUTATION_MALE'),
    },
    {
      value: t('CONTACT_FORM_SALUTATION_FEMALE'),
      label: t('CONTACT_FORM_SALUTATION_FEMALE'),
    },
  ]
  const onSubmit = (event) => {
    const formData = new FormData(event.target)
    const body = {
      recipient,
    }
    formData.forEach((value, key) => (body[key] = value))

    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          setSentStatus('success')
        } else {
          setSentStatus('error')
        }
      })
      .catch(() => setSentStatus('error'))

    event.preventDefault()
    return false
  }

  return (
    <section className="contact-form">
      <FormStatus status={sentStatus} />
      <form id="contact-form" onSubmit={onSubmit}>
        <Heading size="Eos" element="h1">
          {t('CONTACT_FORM_TITLE')}
        </Heading>
        <div className="contact-form__content">
          <FormField
            name="gender"
            value="Mr"
            label={t('CONTACT_FORM_SALUTATION')}
          >
            <FormSelect options={genderOptions}></FormSelect>
          </FormField>
          <FormField name="firstName" label={t('CONTACT_FORM_FIRST_NAME')}>
            <FormInput type="text"></FormInput>
          </FormField>
          <FormField name="surname" label={t('CONTACT_FORM_SURNAME')}>
            <FormInput type="text"></FormInput>
          </FormField>
          <FormField name="email" label={t('CONTACT_FORM_EMAIL')} required>
            <FormInput type="email"></FormInput>
          </FormField>
          <FormField name="subject" label={t('CONTACT_FORM_SUBJECT')}>
            <FormInput type="text"></FormInput>
          </FormField>
          <FormField name="message" label={t('CONTACT_FORM_MESSAGE')} required>
            <FormTextArea></FormTextArea>
          </FormField>
          <Button
            type="submit"
            variant="primary"
            icon="envelope"
            iconPosition="left"
          >
            {t('CONTACT_FORM_SEND_BUTTON')}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default ContactForm
export { default as contactFormVariants } from './variants.js'
