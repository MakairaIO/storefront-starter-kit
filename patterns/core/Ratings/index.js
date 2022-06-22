import StarInput from './StarInput'
import RatingForm from './RatingForm'
import { Copytext, Heading, Text } from '../../index'

import { useTranslation } from '../../../utils'

const Rating = ({ name, text, stars }) => {
  const { t } = useTranslation()

  return (
    <div className="ratings__rating">
      <div className="ratings__rating-header">
        <StarInput disabled value={stars} />
        <Text size="bacchus">
          {t('RATINGS_FROM')} {name}
        </Text>
      </div>
      <Copytext>{text}</Copytext>
    </div>
  )
}

const Ratings = ({ ratings = [] }) => {
  const { t } = useTranslation()

  return (
    <section className="ratings">
      <Heading>{t('RATINGS_HEADING')}</Heading>

      {ratings.map((rating) => (
        <Rating {...rating} key={rating.text} />
      ))}

      {!ratings.length && <Copytext>{t('NO_RATINGS')}</Copytext>}

      <RatingForm />
    </section>
  )
}

export default Ratings
export { default as ratingVariants } from './variants'
