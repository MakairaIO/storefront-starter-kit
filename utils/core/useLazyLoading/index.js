import { useEffect } from 'react'

/**
 * In case you are wondering, why we go the extra mile here and
 * use refs instead of simple selectors:
 * When you try to select elements based on `document.querySelectorAll`,
 * the patterns will fail to work in the variant-preview of the pattern library.
 * Reason for that is, that the iframes in the variant-preview will have different
 * document-contexts and are therefore not able to select the correct elements. :/
 */
export default function useLazyLoading({
  ref = {},
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
      const { current: containingElement } = ref

      if (!containingElement) return

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

      containingElement
        .querySelectorAll(`[data-src], [data-srcset]`)
        .forEach((element) => {
          observer.observe(element)
        })

      return function cleanup() {
        observer.disconnect()
      }
    },
    [ref, dependency, options]
  )
}
