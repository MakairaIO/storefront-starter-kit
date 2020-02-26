import { RequestBuilder, fetchFromMakaira } from '..'

export default async function fetchPageData({ ctx }) {
  const {
    query: { seoUrl: url },
  } = ctx

  const builder = new RequestBuilder(ctx)
  const constraints = builder.getConstraints()
  const aggregations = builder.getAggregations()
  const sorting = builder.getSorting()
  const [count, offset] = builder.getPagination()

  const body = {
    searchPhrase: '',
    isSearch: false,
    enableAggregations: true,
    url,
    aggregations,
    sorting,
    count,
    offset,
    constraints,
  }

  const page = await fetchFromMakaira(body)

  return page
}
