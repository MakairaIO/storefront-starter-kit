export default function preparePaginationForQuerySring(formData) {
  const count = process.env.PRODUCTS_PER_PAGE

  const pageNumber = formData.get('pageNumber') ?? 1

  const offset = (pageNumber - 1) * count

  return { offset }
}
