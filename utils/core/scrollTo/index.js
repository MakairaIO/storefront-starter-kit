export default function scrollTo({ id = '', offset = 0, behavior = 'auto' }) {
  // Defensive Coding:
  // Usually, scrollTo should be defined in basically all browser,
  // but our logs have shown that there are rare cases where scrollTo
  // is not available in a user's browser
  if ('scrollTo' in window) {
    const element = document.getElementById(id)

    if (element) {
      const elementPos = element.getBoundingClientRect().top
      const absoluteElementTop = elementPos + window.pageYOffset
      const middle = absoluteElementTop - window.innerHeight / 2

      window.scrollTo({
        top: middle - offset,
        behavior,
      })
    }
  }
}
