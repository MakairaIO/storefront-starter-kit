export default function scrollTo({ id = '', offset = 0, behavior = 'auto' }) {
  /**
   * Defensive Coding:
   * Usually, scrollTo should be defined in basically all browser,
   * but our logs have shown that there are rare cases where scrollTo
   * is not available in a user's browser
   */
  if ('scrollTo' in window) {
    const element = document.getElementById(id)

    if (element) {
      const elementPos = element.getBoundingClientRect().top
      const absoluteElementTop = elementPos + window.pageYOffset
      const middle = absoluteElementTop - window.innerHeight / 2

      /**
       * There are some really old browser that do have scrollTo defined on the window object
       * but refer to an older implementation.
       * Because of that, we catch occasional errors to avoid crashing the enire application.
       * We could polyfill with https://github.com/iamdustan/smoothscroll but this edge case is not worth it.
       */
      try {
        window.scrollTo({
          top: middle - offset,
          behavior,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
