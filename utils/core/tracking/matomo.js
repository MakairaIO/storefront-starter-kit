let scrollEventHandler = null
let timeIntervalId = null

/**
 * Removes the active scroll depth event listener.
 */
const untrackScrollDepth = () => {
  if (scrollEventHandler) {
    window.removeEventListener('scroll', scrollEventHandler)
    scrollEventHandler = null
  }
}

/**
 * Clears the active time-on-page interval.
 */
const untrackTimeOnPage = () => {
  if (timeIntervalId) {
    clearInterval(timeIntervalId)
    timeIntervalId = null
  }
}

export default {
  // See: https://docs.makaira.io/docs/tracking
  init() {
    // Prevent multiple initializations
    if (window.__matomoInitialized) return

    const trackingId = process.env.NEXT_PUBLIC_MAKAIRA_TRACKING_ID
    if (!trackingId) return null

    var u = 'https://piwik.makaira.io/'
    var _paq = (window._paq = window._paq || [])

    _paq.push(['enableLinkTracking'])
    _paq.push(['setTrackerUrl', u + 'piwik.php'])
    _paq.push(['setSiteId', process.env.NEXT_PUBLIC_MAKAIRA_TRACKING_ID])

    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'piwik.js'
    s.parentNode.insertBefore(g, s)

    // Mark as initialized
    window.__matomoInitialized = true
  },

  /**
   * Sets up scroll depth tracking for the current page.
   * It automatically cleans up any previous scroll tracker.
   */
  trackScrollDepth({ points = [25, 50, 75, 100], debug = false } = {}) {
    if (!window._paq) return

    untrackScrollDepth()

    let maxScrollDepth = 0
    const trackedPoints = new Set()

    const trackScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollDepth = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      )

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth

        points.forEach((point) => {
          const hasHigherTracked = Array.from(trackedPoints).some(
            (tp) => tp > point
          )
          if (
            scrollDepth >= point &&
            !trackedPoints.has(point) &&
            !hasHigherTracked
          ) {
            trackedPoints.add(point)
            window._paq.push(['trackEvent', 'Scroll Depth', `${point}%`, point])
            if (debug) {
              console.log(`[Matomo] Scroll depth tracked: ${point}%`)
            }
          }
        })
      }
    }

    let scrollTimeout
    scrollEventHandler = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(trackScroll, 300)
    }

    window.addEventListener('scroll', scrollEventHandler)
  },

  /**
   * Sets up time-on-page tracking.
   * It automatically cleans up any previous time tracker.
   */
  trackTimeOnPage({ intervals = [10, 30, 60, 120], debug = false } = {}) {
    if (!window._paq) return

    untrackTimeOnPage()

    const trackedIntervals = new Set()
    const pageStartTime = Date.now()

    timeIntervalId = setInterval(() => {
      const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000)

      intervals.forEach((interval) => {
        if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
          trackedIntervals.add(interval)
          window._paq.push([
            'trackEvent',
            'Time on Page',
            `${interval}s`,
            interval,
          ])
          if (debug) {
            console.log(`[Matomo] Time on page tracked: ${interval}s`)
          }
        }
      })
    }, 1000)
  },
  untrackScrollDepth,
  untrackTimeOnPage,

  enterAbTest({ experiments = [] }) {
    if (experiments.length == 0 || !window._paq) return

    experiments.forEach((entry) => {
      const { experiment, variation } = entry

      window._paq.push(['trackEvent', 'abtesting', experiment, variation])
    })
  },

  trackGoal(id) {
    // Matomo has not been initialized
    if (!window._paq) return

    window._paq.push(['trackGoal', id])
  },
}
