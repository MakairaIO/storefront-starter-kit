import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchSnippetData({ ids = [], language = '' }) {
  const builder = new RequestBuilder()
  const constraints = builder.getConstraints({ language })

  const body = {
    snippetIds: ids,
    constraints,
  }

  const page = await fetchFromMakaira({ body, isSnippet: true })

  return page
}
