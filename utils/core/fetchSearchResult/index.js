import allLanguages from '../../../config/allLanguages'
import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchSearchResult({ ctx }) {
  const path = ctx.asPath
    .replace(/\?.*/, '') // remove query string
    .replace(/\/$/, '') // replace trailing slash to match definition in allLanguages

  const languageObject = allLanguages.find((lang) => lang.searchRoute == path)
  const language = languageObject['value']

  const builder = new RequestBuilder(ctx)
  const constraints = builder.getConstraints()
  const aggregations = builder.getAggregations()
  const sorting = builder.getSorting()
  const [count, offset] = builder.getPagination()

  const isSearch = true

  const body = {
    searchPhrase: ctx.query.searchPhrase,
    isSearch,
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

  let page = await fetchFromMakaira({ body, isSearch })
  page.language = language

  return page
}
