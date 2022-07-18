import React, { useEffect, useState } from 'react'

import StarInput from './StarInput'
import { Button, FormField, FormStatus, FormTextArea } from '../..'

import { useTranslation } from '../../../utils'
import { useShopClient } from '@makaira/storefront-react'
import { useRouter } from 'next/router'

const RatingForm = (product) => {
  const { t } = useTranslation()
  const { client } = useShopClient()
  const { asPath } = useRouter()
  const INITIAL_VALUES = { rating: 0, text: '' }

  const [formValues, setFormValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    setSubmitStatus('')
    setFormValues(INITIAL_VALUES)
  }, [asPath])

  const handleTextChange = (event) => {
    setFormValues({ ...formValues, text: event.target.value })
  }

  const handleStarsChange = (rating) => {
    setFormValues({ ...formValues, rating })
  }

  const handleSubmit = async () => {
    const submitErrors = {}
    if (formValues.text === '') {
      submitErrors.text = t('FORM_NOT_EMPTY')
    }

    setErrors(submitErrors)

    if (Object.keys(submitErrors).length === 0) {
      const { error } = await client.review.createReview({
        input: {
          review: {
            product: { id: product.productId },
            rating: formValues.rating,
            text: formValues.text,
          },
        },
      })

      setSubmitStatus(error ? 'error' : 'success')

      if (!error) {
        setFormValues(INITIAL_VALUES)
      }
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
        name="rating"
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
