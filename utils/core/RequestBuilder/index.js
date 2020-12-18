import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
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
      'query.shop_id': process.env.SHOP_ID,
      'query.use_stock': true,
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

      setCookie(this.ctx, 'userAgent', userAgent)

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

      setCookie(this.ctx, 'ip', ip)

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

    setCookie(this.ctx, 'timezone', tz)

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
}

export default RequestBuilder
