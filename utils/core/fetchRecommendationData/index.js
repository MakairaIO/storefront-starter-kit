import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchRecommandationData({ productId }) {
  const language = 'de'
  const builder = new RequestBuilder()
  const constraints = builder.getConstraints({ language })

  const body = {
    constraints,
    count: 10,
    recommendationId: 'similar-products',
    productId,
  }

  const page = await fetchFromMakaira({ body, isRecommend: true })

  return page
}
