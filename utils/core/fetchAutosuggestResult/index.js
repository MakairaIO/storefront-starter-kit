import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchAutosuggestResult({
  searchPhrase,
  language,
}) {
  const builder = new RequestBuilder()
  const constraints = builder.getConstraints({ language })

  const isSearch = true

  const body = {
    searchPhrase,
    isSearch,
    enableAggregations: false,
    aggregations: [],
    sorting: [],
    count: 8,
    offset: 0,
    constraints,
  }

  return await fetchFromMakaira({ body, isSearch })
}
