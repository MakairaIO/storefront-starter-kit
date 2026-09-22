import { RequestBuilder, fetchFromMakaira } from '../..'
import normalizeSnippetResponse from './normalizeSnippetResponse'

export default async function fetchSnippetData({
  ids = [],
  language = '',
  ctx = {},
}) {
  const builder = new RequestBuilder(ctx)
  const constraints = builder.getConstraints({ language })

  const body = {
    snippetIds: ids,
    constraints,
  }

  const page = await fetchFromMakaira({ body, isSnippet: true })

  return normalizeSnippetResponse(page)
}
