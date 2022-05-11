import StarInput from './StarInput'
import {
  Button,
  Copytext,
  FormField,
  FormInput,
  FormTextArea,
  Heading,
  Text,
} from '../../index'
import { useTranslation } from '../../../utils'
import { useState } from 'react'

const Rating = ({ name, text, stars }) => {
  const { t } = useTranslation()

  return (
    <div className="ratings__rating">
      <div className="ratings__rating-header">
        <StarInput disabled stars={stars} />
        <Text size="bacchus">
          {t('RATINGS_FROM')} {name}
        </Text>
      </div>
      <Copytext>{text}</Copytext>
    </div>
  )
}

const RatingForm = () => {
  const { t } = useTranslation()

  const [formValues, setFormValues] = useState({ name: '', stars: 0, text: '' })

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
    console.log(formValues)
  }

  return (
    <div className="ratings__form">
      <FormField
        name="name"
        label={t('RATINGS_LABEL_NAME')}
        onChange={handleNameChange}
        values={formValues}
      >
        <FormInput type="text" />
      </FormField>
      <FormField
        name="stars"
        label={t('RATINGS_LABEL_STARS')}
        onChange={handleStarsChange}
        values={formValues}
      >
        <StarInput />
      </FormField>
      <FormField
        name="text"
        label={t('RATINGS_LABEL_TEXT')}
        onChange={handleTextChange}
        values={formValues}
      >
        <FormTextArea type="text" />
      </FormField>
      <Button variant="primary" onClick={handleSubmit}>
        {t('RATINGS_LABEL_SUBMIT')}
      </Button>
    </div>
  )
}

const Ratings = ({ ratings = [] }) => {
  const { t } = useTranslation()

  return (
    <section className="ratings">
      <Heading>{t('RATINGS_HEADING')}</Heading>

      <RatingForm />

      {ratings.map((rating) => (
        <Rating {...rating} key={rating.text} />
      ))}

      {!ratings.length && <Copytext>{t('NO_RATINGS')}</Copytext>}
    </section>
  )
}

export default Ratings
export { default as ratingVariants } from './variants'
