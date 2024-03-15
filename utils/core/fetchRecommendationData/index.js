import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchRecommendationData({
  productId = '',
  recommendationId = '',
  language = '',
  filter = [],
  count = 5,
}) {
  const builder = new RequestBuilder()
  const constraints = builder.getConstraints({ language })

  const body = {
    constraints,
    count,
    recommendationId,
    productId,
    filter,
  }

  const page = await fetchFromMakaira({ body, isRecommendation: true })

  return page
}
