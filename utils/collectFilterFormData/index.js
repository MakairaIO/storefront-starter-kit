const DESKTOP_FILTER_BREAKPOINT = 1000

export default function collectFilterFormData() {
  let filterForm

  if (window.innerWidth < DESKTOP_FILTER_BREAKPOINT) {
    filterForm = document.querySelector('.mobile-filter')
  } else {
    filterForm = document.querySelector('.desktop-filter')
  }

  // TODO: Error Handling

  return new FormData(filterForm)
}
