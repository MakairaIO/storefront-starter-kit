export default {
  init() {
    const gtmId = process.env.GTM_ID

    if (!gtmId) return null

    this.addScriptTag(gtmId)
    this.addNoScriptTag(gtmId)
  },

  addScriptTag(gtmId) {
    const gtmDomain =
      process.env.GTM_DOMAIN ?? 'https://www.googletagmanager.com'

    const code = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  '${gtmDomain}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');`

    const script = document.createElement('script')
    script.innerHTML = code
    document.head.insertBefore(script, document.head.childNodes[0])
  },

  addNoScriptTag(gtmId) {
    const gtmDomain =
      process.env.GTM_DOMAIN ?? 'https://www.googletagmanager.com'

    const code = `<iframe src="${gtmDomain}/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`

    const noscript = document.createElement('noscript')
    noscript.innerHTML = code
    document.body.insertBefore(noscript, document.body.childNodes[0])
  },

  trackEvent(event) {
    // Defensive Coding
    if (!window) return

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)
  },
}
