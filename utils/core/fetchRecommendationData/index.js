import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchRecommendationData({ productId }) {
  const language = 'de'
  const builder = new RequestBuilder()
  const constraints = builder.getConstraints({ language })

  const body = {
    constraints,
    count: 5,
    recommendationId: 'similar-products',
    productId,
  }

  const page = await fetchFromMakaira({ body, isRecommendation: true })

  return page
}
