import { RequestBuilder, fetchFromMakaira } from '../..'

export default async function fetchDocumentData({
  language = '',
  datatype = '',
  fields = [],
  ids = [],
}) {
  const builder = new RequestBuilder()
  const constraints = builder.getConstraints({ language })

  const body = {
    constraints,
    datatype,
    fields,
    ids,
  }

  const page = await fetchFromMakaira({ body, isDocument: true })

  return page
}
