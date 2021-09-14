import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchPageData({ ctx }) {
  const {
    query: { seoUrl: url },
  } = ctx

  const builder = new RequestBuilder(ctx)
  const constraints = builder.getConstraints()
  const aggregations = builder.getAggregations()
  const sorting = builder.getSorting()
  const [count, offset] = builder.getPagination()
  const { bundles, currentSlot } = builder.getBundles()

  const body = {
    searchPhrase: '',
    isSearch: false,
    enableAggregations: true,
    url: encodeURI(url),
    aggregations,
    sorting,
    count,
    offset,
    bundles,
    constraints,
  }

  if (currentSlot) {
    body.slot = currentSlot
  }

  const page = await fetchFromMakaira({ body })

  return page
}
