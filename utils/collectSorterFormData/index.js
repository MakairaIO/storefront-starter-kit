export default function collectSorterFormData() {
  const sorterForm = document.querySelector('.product-list__sorter')

  // Defensive Coding
  if (!sorterForm) {
    return new FormData()
  }

  return new FormData(sorterForm)
}
