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

  getConstraints() {
    return {
      'query.shop_id': process.env.SHOP_ID,
      'query.use_stock': true,
      'oi.user.agent': this.getUserAgent(),
      'oi.user.ip': this.getIpAddress(),
    }
  }

  getAggregations() {
    const { makairaFilter } = this.params

    if (!makairaFilter || isEmpty(makairaFilter)) return {}

    return { ...makairaFilter }
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

  getUserAgent() {
    let userAgent = null

    if (process.browser) {
      const [, encodedUserAgent] = document.cookie
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
      const [, encodedIp] = document.cookie
        .split(';')
        .map(el => el.trim())
        .map(el => el.split('='))
        .find(el => el[0] === 'ip')

      ip = decodeURIComponent(encodedIp)
    } else {
      ip =
        this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress

      /**
       * The 'x-forwarded-for' header may return multiple IP addresses in
       * the following format: `client IP, proxy 1 IP, proxy 2 IP`
       * Therefore we use the first one in that list.
       */
      ip = ip.split(',')[0]

      this.res.cookie('ip', ip)
    }

    return ip
  }
}

export default RequestBuilder
