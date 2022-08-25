import { useShopReviews } from '@makaira/storefront-react'

import StarInput from './StarInput'
import RatingForm from './RatingForm'
import { Copytext, Heading, Text } from '../../index'

import { useTranslation } from '../../../utils'

const Rating = ({ text, rating }) => {
  const { t } = useTranslation()

  return (
    <div className="ratings__rating">
      <div className="ratings__rating-header">
        <StarInput disabled value={rating} />
        <Text size="bacchus">
          {t('RATINGS_FROM')} {name}
        </Text>
      </div>
      <Copytext>{text}</Copytext>
    </div>
  )
}

const Ratings = (product) => {
  const { loading, data } = useShopReviews({
    product: { id: product.productId },
    refetchOnReviewCreated: true,
  })
  const { t } = useTranslation()

  const reviews = data?.items ?? []

  return (
    <section className="ratings">
      <Heading>{t('RATINGS_HEADING')}</Heading>

      {reviews.map(({ review }) => (
        <Rating {...review} key={review.id} />
      ))}

      {!reviews.length && loading && (
        <Copytext>{t('RATINGS_LOADING')}</Copytext>
      )}

      {!reviews.length && !loading && <Copytext>{t('NO_RATINGS')}</Copytext>}

      <RatingForm {...product} />
    </section>
  )
}

export default Ratings
export { default as ratingVariants } from './variants'
