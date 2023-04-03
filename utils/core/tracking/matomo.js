export default {
  // See: https://docs.makaira.io/docs/tracking
  init() {
    const trackingId = process.env.MAKAIRA_TRACKING_ID

    if (!trackingId) return null

    var u = 'https://piwik.makaira.io/'
    var _paq = (window._paq = window._paq || [])

    _paq.push(['enableLinkTracking'])
    _paq.push(['setTrackerUrl', u + 'piwik.php'])
    _paq.push(['setSiteId', process.env.MAKAIRA_TRACKING_ID])

    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'piwik.js'
    s.parentNode.insertBefore(g, s)
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
