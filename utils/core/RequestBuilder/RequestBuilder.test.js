import RequestBuilder from '.'

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
const IP_ADDRESS = '154.412.21.3, 154.412.21.2'
const LANGUAGE = 'en'
const REQUEST = {
  headers: {
    'user-agent': USER_AGENT,
    'x-forwarded-for': IP_ADDRESS,
  },
}
const RESPONSE = {}
const QUERY = { language: LANGUAGE }

describe('RequestBuilder', () => {
  describe('getConstraints()', () => {
    const ctx = { req: REQUEST, res: RESPONSE }
    const builder = new RequestBuilder(ctx)

    const constraints = builder.getConstraints()

    it('should return use_stock of true', () => {
      expect(constraints['query.use_stock']).toBe(true)
    })
  })

  describe('getUserAgent()', () => {
    it('should return the user-agent', () => {
      const ctx = { req: REQUEST, res: RESPONSE }
      const builder = new RequestBuilder(ctx)

      const userAgent = builder.getUserAgent()

      expect(userAgent).toEqual(USER_AGENT)
    })
  })

  describe('getIpAddress()', () => {
    it('should return the anonymized ip-address', () => {
      const ctx = { req: REQUEST, res: RESPONSE }
      const builder = new RequestBuilder(ctx)

      const ip = builder.getIpAddress()
      const anonymized = builder.anonymize(IP_ADDRESS.split(',')[0])

      expect(ip).toEqual(anonymized)
    })
  })

  describe('getConstraints()', () => {
    const ctx = { query: QUERY, req: REQUEST, res: RESPONSE }
    const builder = new RequestBuilder(ctx)

    const constraints = builder.getConstraints()

    it('should return use_stock of true', () => {
      expect(constraints['query.use_stock']).toBe(true)
    })
  })

  describe('getAggregations()', () => {
    it('should return an empty object when no params provided', () => {
      const ctx = { req: REQUEST, res: RESPONSE, query: {} }
      const builder = new RequestBuilder(ctx)

      const aggregations = builder.getAggregations()

      expect(aggregations).toEqual({})
    })

    it('should return filter when present in params', () => {
      const params = {
        filter: {
          category: ['0f40c6a077b68c21f164767c4a903fd2'],
          price_from_price: '253',
        },
      }
      const ctx = {
        req: REQUEST,
        res: RESPONSE,
        query: { ...params },
      }
      const builder = new RequestBuilder(ctx)

      const aggregations = builder.getAggregations()

      expect(aggregations).toEqual(params['filter'])
    })
  })

  describe('getSorting()', () => {
    it('should return an empty object when no params provided', () => {
      const ctx = { req: REQUEST, res: RESPONSE, query: {} }
      const builder = new RequestBuilder(ctx)

      const sorting = builder.getSorting()

      expect(sorting).toEqual({})
    })

    it('should return sorting with uppercased keys sortOption does not start with "ox"', () => {
      const params = {
        sortBy: 'onesaison',
        order: 'desc',
      }
      const ctx = {
        req: REQUEST,
        res: RESPONSE,
        query: { ...params },
      }
      const builder = new RequestBuilder(ctx)

      const sorting = builder.getSorting()

      expect(sorting).toEqual({ onesaison: 'desc' })
    })

    it('should default to a ascending sort order', () => {
      const params = {
        sortBy: 'title',
      }
      const ctx = {
        req: REQUEST,
        res: RESPONSE,
        query: { ...params },
      }
      const builder = new RequestBuilder(ctx)

      const sorting = builder.getSorting()

      expect(sorting).toEqual({ title: 'asc' })
    })
  })

  describe('getPagination()', () => {
    it('should return a tuple of [count, offset]', () => {
      const params = {
        count: '25',
        offset: '15',
      }
      const ctx = {
        req: REQUEST,
        res: RESPONSE,
        query: { ...params },
      }
      const builder = new RequestBuilder(ctx)

      const pagination = builder.getPagination()

      expect(pagination).toEqual(['25', '15'])
    })
  })
})
