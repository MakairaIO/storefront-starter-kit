import { RequestBuilder, fetchFromMakaira } from '..'
import { allLanguages } from '../../public/utils'

export default async function fetchSearchResult({ ctx }) {
  const path = ctx.asPath
    .replace(/\?.*/, '') // remove query string
    .replace(/\/$/, '') // replace trailing slash to match definition in allLanguages

  const language = allLanguages.find(lang => lang.searchRoute == path)['value']

  const builder = new RequestBuilder(ctx)
  const constraints = builder.getConstraints()
  const aggregations = builder.getAggregations()
  const sorting = builder.getSorting()
  const [count, offset] = builder.getPagination()

  const body = {
    searchPhrase: ctx.query.searchPhrase,
    isSearch: true,
    enableAggregations: true,
    aggregations,
    sorting,
    count,
    offset,
    constraints: {
      ...constraints,
      'query.language': language,
    },
  }

  let page = await fetchFromMakaira(body)

  return page
}
