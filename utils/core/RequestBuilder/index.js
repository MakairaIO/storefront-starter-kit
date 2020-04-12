import isEmpty from 'lodash/isEmpty'
import qs from 'qs'

class RequestBuilder {
  constructor(ctx = {}) {
    const { req, res, query = {} } = ctx
    const { seoUrl, ...params } = qs.parse(query)

    this.req = req
    this.res = res
    this.params = params
  }

  getConstraints(additionalConstraints = {}) {
    let constraints = {
      'query.shop_id': process.env.SHOP_ID,
      'query.use_stock': true,
    }

    const { language } = additionalConstraints

    if (language) {
      constraints['query.language'] = language
    }

    return constraints
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
