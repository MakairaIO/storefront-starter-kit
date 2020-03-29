export default function scrollTo({ id = '', offset = 0, behavior = 'auto' }) {
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
