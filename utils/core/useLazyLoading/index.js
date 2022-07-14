import { useEffect } from 'react'

function callback(entries, observer) {
  entries.forEach((entry) => {
    const isBelowViewport = entry.boundingClientRect.top > 0

    if (!entry.isIntersecting && isBelowViewport) {
      return
    }

    const { dataset } = entry.target

    if (dataset.src) entry.target.src = dataset.src

    if (dataset.srcset) entry.target.srcset = dataset.srcset

    observer.unobserve(entry.target)
  })
}

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
  active = true,
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
      if (!active) return

      const { current: containingElement } = ref

      if (!containingElement) return

      /**
       * Defensive Coding:
       * Even though you can attempt to polyfill IntersectionObserver,
       * we still saw in our logs that some versions of Safarai managed
       * to produce errors when attempting to initialize an observer.
       * Therefore, we do a separate check here if the IntersectionObserver
       * really is available
       */
      if (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      ) {
        const observer = new IntersectionObserver(callback, options)

        containingElement
          .querySelectorAll(`[data-src], [data-srcset]`)
          .forEach((element) => {
            observer.observe(element)
          })

        return function cleanup() {
          observer.disconnect()
        }
      } else {
        containingElement
          .querySelectorAll(`[data-src], [data-srcset]`)
          .forEach((element) => {
            const { dataset } = element

            if (dataset.src) element.src = dataset.src

            if (dataset.srcset) element.srcset = dataset.srcset
          })
      }
    },
    [ref, dependency, options]
  )
}
