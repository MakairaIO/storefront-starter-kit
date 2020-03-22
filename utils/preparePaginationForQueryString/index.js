export default function preparePaginationForQuerySring(formData, count) {
  const pageNumber = formData.get('pageNumber') ?? 1

  const offset = (pageNumber - 1) * count

  return { offset }
}
