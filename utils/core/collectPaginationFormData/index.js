export default function collectPaginationFormData() {
  const paginationForm = document.querySelector('.product-list__pagination')

  // Defensive Coding
  if (!paginationForm) {
    return new FormData()
  }

  return new FormData(paginationForm)
}
