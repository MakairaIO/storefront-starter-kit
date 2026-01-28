export default {
  // See: https://docs.makaira.io/docs/tracking
  init() {
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
  },

  isDirectTrackingEnabled() {
    return process.env.NEXT_PUBLIC_MATOMO_DIRECT_TRACKING === 'true'
  },

  trackPageView({ pageTitle, pageUrl } = {}) {
    // Direct tracking is disabled by default to avoid double tracking with GTM
    if (!this.isDirectTrackingEnabled()) return

    // Matomo has not been initialized
    if (!window._paq) return

    if (pageUrl) {
      window._paq.push(['setCustomUrl', pageUrl])
    }

    if (pageTitle) {
      window._paq.push(['setDocumentTitle', pageTitle])
    }

    window._paq.push(['trackPageView'])
  },

  trackSiteSearch({ keyword, category, resultsCount } = {}) {
    // Direct tracking is disabled by default to avoid double tracking with GTM
    if (!this.isDirectTrackingEnabled()) return

    // Matomo has not been initialized
    if (!window._paq) return

    // keyword is required for Matomo's trackSiteSearch
    if (!keyword) return

    window._paq.push(['trackSiteSearch', keyword, category, resultsCount])
  },

  enterAbTest({ experiments = [] }) {
    if (experiments.length == 0) return

    // Matomo has not been initialized
    if (!window._paq) return

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
