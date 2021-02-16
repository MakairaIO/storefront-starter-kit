import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchRecommendationData({
  productId = '',
  recommendationId = '',
  language = '',
}) {
  const builder = new RequestBuilder()
  const constraints = builder.getConstraints({ language })

  const body = {
    constraints,
    count: 5,
    recommendationId,
    productId,
  }

  const page = await fetchFromMakaira({ body, isRecommendation: true })

  return page
}
