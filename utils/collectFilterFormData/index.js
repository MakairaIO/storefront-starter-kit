const DESKTOP_FILTER_BREAKPOINT = 1000

export default function collectFilterFormData() {
  let filterForm

  if (window.innerWidth < DESKTOP_FILTER_BREAKPOINT) {
    filterForm = document.querySelector('.mobile-filter')
  } else {
    filterForm = document.querySelector('.desktop-filter')
  }

  // Defensive Coding
  if (!filterForm) {
    return new FormData()
  }

  return new FormData(filterForm)
}
