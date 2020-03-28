import { useEffect } from 'react'

export default function useLazyLoading({
  selector = '',
  dependency = null,
  customOptions = {},
}) {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  }

  const options = {
    defaultOptions,
    ...customOptions,
  }

  useEffect(
    function initLazyLoading() {
      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const { dataset } = entry.target

          if (dataset.src) entry.target.src = dataset.src

          if (dataset.srcset) entry.target.srcset = dataset.srcset

          observer.unobserve(entry.target)
        })
      }

      const observer = new IntersectionObserver(callback, options)

      document
        .querySelectorAll(`${selector} [data-src], ${selector} [data-srcset]`)
        .forEach((element) => {
          observer.observe(element)
        })

      return function cleanup() {
        observer.disconnect()
      }
    },
    [selector, dependency, options]
  )
}
