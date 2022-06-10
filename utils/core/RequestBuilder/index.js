import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import { parseCookies, setCookie } from 'nookies'

class RequestBuilder {
  constructor(ctx = {}) {
    const { req, res, query = {} } = ctx
    const { seoUrl, ...params } = qs.parse(query)

    this.ctx = ctx
    this.req = req
    this.res = res
    this.params = params
  }

  getConstraints(additionalConstraints = {}) {
    let constraints = {
      'query.shop_id': process.env.SHOP_ID ?? 1,
      'query.use_stock': true,
      'query.original_keys': true,
      'oi.user.agent': this.getUserAgent(),
      'oi.user.ip': this.getIpAddress(),
      'oi.user.timezone': this.getTimeZone(),
      'ab.experiments': this.getExperiments(),
    }

    const { language } = additionalConstraints

    if (language) {
      constraints['query.language'] = language
    }

    return constraints
  }

  getUserAgent() {
    if (process.browser) {
      const { userAgent = '' } = parseCookies()

      return userAgent
    } else {
      const userAgent = this.req.headers['user-agent']

      setCookie(this.ctx, 'userAgent', userAgent, { path: '/' })

      return userAgent
    }
  }

  getIpAddress() {
    if (process.browser) {
      const { ip = '' } = parseCookies()

      return ip
    } else {
      let ip =
        this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress

      // 'x-forwarded-for' header may return multiple IP addresses in
      // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
      // the first one
      ip = ip.split(',')[0]
      ip = this.anonymize(ip)

      setCookie(this.ctx, 'ip', ip, { path: '/' })

      return ip
    }
  }

  getTimeZone() {
    const { timezone = '' } = parseCookies()

    if (timezone) return timezone

    if (!process.browser) return ''

    let rawOffset = new Date().getTimezoneOffset() * -1
    let isNegative = rawOffset < 0
    let hours = Math.abs(Math.floor(rawOffset / 60))
    let minutes = Math.abs(rawOffset % 60)

    const tz =
      (isNegative ? '-' : '+') +
      ('00' + hours).slice(-2) +
      ('00' + minutes).slice(-2)

    setCookie(this.ctx, 'timezone', tz, { path: '/' })

    return tz
  }

  getExperiments() {
    // We need to send null if no experiments are available in the cookie or
    // we do not get back new experiments in the API response.
    let experiments = null

    const { mak_experiments = '' } = parseCookies(this.ctx)

    if (!mak_experiments) return experiments

    return JSON.parse(mak_experiments)
  }

  getBundles() {
    const { bundleId, slots, currentSlot } = this.prepareBundleParams()

    if (!bundleId) return {}

    let bundles = {}

    bundles[bundleId] = reduce(
      slots,
      (bundleObject, currentSlot, key) => {
        bundleObject[key] = currentSlot

        return bundleObject
      },
      {}
    )

    return { bundles, currentSlot }
  }

  anonymize(ip) {
    return ip.replace(/^(\d+\.\d+).*/, '$1.0.0')
  }

  getAggregations() {
    const { filter } = this.params

    if (!filter || isEmpty(filter)) return {}

    return { ...filter }
  }

  getSorting() {
    const { sortBy, order = 'asc' } = this.params

    if (!sortBy) return {}

    return {
      [sortBy]: order,
    }
  }

  getPagination() {
    const { count = process.env.PRODUCTS_PER_PAGE, offset = '0' } = this.params

    return [count, offset]
  }

  getCookiesByValue(key) {
    try {
      const cookies = parseCookies(this.ctx)

      if (cookies[key]) {
        return JSON.parse(cookies[key])
      }

      return {}
    } catch (e) {
      throw new Error(e.message)
    }
  }

  prepareBundleParams() {
    const bundleCookies = this.getCookiesByValue('bundle')
    const { bundleId } = this.params
    const seoUrl = this.ctx.query.seoUrl.replace(/\//g, '') // remove slashes

    if (bundleId) {
      this.setBundleCookie(this.params, seoUrl)
      return this.params
    } else if (bundleCookies[seoUrl]) {
      return bundleCookies[seoUrl]
    }

    return {}
  }

  setBundleCookie(data, seoUrl) {
    let cookieValue = this.getCookiesByValue('bundle')
    cookieValue[seoUrl] = data
    cookieValue = JSON.stringify(cookieValue)
    setCookie(this.ctx, 'bundle', cookieValue, { path: '/' })
  }
}

export default RequestBuilder
