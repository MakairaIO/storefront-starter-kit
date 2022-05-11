import React, { useState } from 'react'

import StarInput from './StarInput'
import { Button, FormField, FormInput, FormStatus, FormTextArea } from '../..'

import { useTranslation } from '../../../utils'

const RatingForm = () => {
  const { t } = useTranslation()
  const INITIAL_VALUES = { name: '', stars: 0, text: '' }

  const [formValues, setFormValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState('')

  const handleNameChange = (event) => {
    setFormValues({ ...formValues, name: event.target.value })
  }

  const handleTextChange = (event) => {
    setFormValues({ ...formValues, text: event.target.value })
  }

  const handleStarsChange = (amount) => {
    setFormValues({ ...formValues, stars: amount })
  }

  const handleSubmit = () => {
    const submitErrors = {}
    if (formValues.name === '') {
      submitErrors.name = t('FORM_NOT_EMPTY')
    }
    if (formValues.text === '') {
      submitErrors.text = t('FORM_NOT_EMPTY')
    }

    setErrors(submitErrors)

    if (Object.keys(submitErrors).length === 0) {
      setSubmitStatus('success')
      setFormValues(INITIAL_VALUES)
    }
  }

  return (
    <div className="ratings__form">
      <FormStatus
        status={submitStatus}
        successMessage={t('RATINGS_STATUS_SUCCESS')}
        errorMessage={t('RATINGS_STATUS_FAILURE')}
      />
      <FormField
        name="name"
        label={t('RATINGS_LABEL_NAME')}
        onChange={handleNameChange}
        values={formValues}
        required
        errors={errors}
      >
        <FormInput type="text" />
      </FormField>
      <FormField
        name="stars"
        label={t('RATINGS_LABEL_STARS')}
        onChange={handleStarsChange}
        values={formValues}
        required
        errors={errors}
      >
        <StarInput />
      </FormField>
      <FormField
        name="text"
        label={t('RATINGS_LABEL_TEXT')}
        onChange={handleTextChange}
        values={formValues}
        required
        errors={errors}
      >
        <FormTextArea type="text" />
      </FormField>
      <Button variant="primary" onClick={handleSubmit}>
        {t('RATINGS_LABEL_SUBMIT')}
      </Button>
    </div>
  )
}

export default RatingForm
