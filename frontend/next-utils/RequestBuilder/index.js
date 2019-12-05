import isEmpty from 'lodash/isEmpty'
import qs from 'qs'

class RequestBuilder {
  constructor(ctx) {
    const { req, res, query = {} } = ctx
    const { seoUrl, ...params } = qs.parse(query)

    this.req = req
    this.res = res
    this.params = params
  }

  getConstraints(language = null) {
    let constraints = {
      'query.shop_id': 1,
      'query.use_stock': true,
      'oi.user.agent': this.getUserAgent(),
      'oi.user.ip': this.getIpAddress(),
    }
    if (language != null && typeof language != 'undefined') {
      //for autosuggest we pass language as parameter
      constraints['query.language'] = language
    }
    if (typeof this.params.language != 'undefined') {
      //for search requests: language is in params
      constraints['query.language'] = this.params.language
    }
    return constraints
  }

  getAggregations() {
    const { makairaFilter } = this.params

    if (!makairaFilter || isEmpty(makairaFilter)) return {}

    return { ...makairaFilter }
  }

  getSorting() {
    const { sortBy, order = 'asc' } = this.params

    if (!sortBy) return {}

    const key = sortBy.startsWith('ox')
      ? sortBy.toUpperCase()
      : sortBy.toLowerCase()

    return {
      [key]: order,
    }
  }

  getPagination() {
    const { count = '36', offset = '0' } = this.params

    return [count, offset]
  }

  getUserAgent() {
    let userAgent = null

    if (process.browser) {
      const [_, encodedUserAgent] = document.cookie
        .split(';')
        .map(el => el.trim())
        .map(el => el.split('='))
        .find(el => el[0] === 'userAgent')
      userAgent = decodeURIComponent(encodedUserAgent)
    } else {
      userAgent = this.req.headers['user-agent']
      this.res.cookie('userAgent', userAgent)
    }

    return userAgent
  }

  getIpAddress() {
    let ip = null

    if (process.browser) {
      const [_, encodedIp] = document.cookie
        .split(';')
        .map(el => el.trim())
        .map(el => el.split('='))
        .find(el => el[0] === 'ip')
      ip = decodeURIComponent(encodedIp)
    } else {
      ip =
        this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress

      // 'x-forwarded-for' header may return multiple IP addresses in
      // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
      // the first one
      ip = ip.split(',')[0]

      this.res.cookie('ip', ip)
    }

    return ip
  }
}

export default RequestBuilder
