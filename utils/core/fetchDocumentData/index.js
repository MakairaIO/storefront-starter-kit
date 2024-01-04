import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchDocumentData({
  language = '',
  datatype = '',
  fields = [],
  ids = [],
  ctx = {},
  filters,
  sorting,
}) {
  const builder = new RequestBuilder(ctx)
  const constraints = builder.getConstraints({ language })

  let body = {
    constraints,
    datatype,
    fields,
  }

  if (ids && ids.length > 0) {
    body.ids = ids
  }

  if (filters && Object.keys(filters)) {
    body['aggregations'] = filters
  }

  if (sorting && Object.keys(sorting)) {
    body['sorting'] = sorting
  }

  const page = await fetchFromMakaira({ body, isDocument: true })

  return page
}
