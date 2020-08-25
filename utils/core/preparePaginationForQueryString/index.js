export default function preparePaginationForQueryString(
  formData,
  count,
  resetPagination
) {
  let offset = 0

  if (resetPagination) return { offset }

  const pageNumber = formData.get('pageNumber') ?? 1

  offset = (pageNumber - 1) * count

  return { offset }
}
