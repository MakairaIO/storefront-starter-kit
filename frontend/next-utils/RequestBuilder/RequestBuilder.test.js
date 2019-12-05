import { RequestBuilder } from '..'

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
const RESPONSE = { cookie: jest.fn() }
const QUERY = { language: LANGUAGE }

describe('RequestBuilder', () => {
  afterEach(() => {
    RESPONSE.cookie.mockClear()
  })

  describe('getUserAgent()', () => {
    it('should return the user-agent', () => {
      const ctx = { req: REQUEST, res: RESPONSE }
      const builder = new RequestBuilder(ctx)

      const userAgent = builder.getUserAgent()

      expect(userAgent).toEqual(USER_AGENT)
    })

    it('should save the user-agent in cookie', () => {
      const ctx = { req: REQUEST, res: RESPONSE }
      const builder = new RequestBuilder(ctx)

      builder.getUserAgent()

      expect(RESPONSE.cookie).toHaveBeenCalledTimes(1)
      expect(RESPONSE.cookie).toHaveBeenCalledWith('userAgent', USER_AGENT)
    })
  })

  describe('getIpAddress()', () => {
    it('should return the ip-address', () => {
      const ctx = { req: REQUEST, res: RESPONSE }
      const builder = new RequestBuilder(ctx)

      const ip = builder.getIpAddress()

      expect(ip).toEqual(IP_ADDRESS.split(',')[0])
    })

    it('should save the ip-address in cookie', () => {
      const ctx = { req: REQUEST, res: RESPONSE }
      const builder = new RequestBuilder(ctx)

      builder.getIpAddress()

      expect(RESPONSE.cookie).toHaveBeenCalledTimes(1)
      expect(RESPONSE.cookie).toHaveBeenCalledWith(
        'ip',
        IP_ADDRESS.split(',')[0]
      )
    })
  })

  describe('getConstraints()', () => {
    const ctx = { req: REQUEST, res: RESPONSE }
    const builder = new RequestBuilder(ctx)

    const constraints = builder.getConstraints()

    it('should return a the shop-id of 1', () => {
      expect(constraints['query.shop_id']).toEqual(1)
    })

    it('should return use_stock of true', () => {
      expect(constraints['query.use_stock']).toBe(true)
    })

    it('should return the user-agent', () => {
      expect(constraints['oi.user.agent']).toEqual(USER_AGENT)
    })

    it('should return the ip-address', () => {
      expect(constraints['oi.user.ip']).toEqual(IP_ADDRESS.split(',')[0])
    })
  })

  describe('getConstraints()', () => {
    const ctx = { query: QUERY, req: REQUEST, res: RESPONSE }
    const builder = new RequestBuilder(ctx)

    const constraints = builder.getConstraints()

    it('should return a the shop-id of 1', () => {
      expect(constraints['query.shop_id']).toEqual(1)
    })

    it('should return use_stock of true', () => {
      expect(constraints['query.use_stock']).toBe(true)
    })

    it('should return the user-agent', () => {
      expect(constraints['oi.user.agent']).toEqual(USER_AGENT)
    })

    it('should return the ip-address', () => {
      expect(constraints['oi.user.ip']).toEqual(IP_ADDRESS.split(',')[0])
    })

    it('should return the language', () => {
      expect(constraints['query.language']).toEqual(LANGUAGE)
    })
  })

  describe('getConstraints()', () => {
    const ctx = { query: {}, req: REQUEST, res: RESPONSE }
    const builder = new RequestBuilder(ctx)

    const constraints = builder.getConstraints('de')

    it('should return the language', () => {
      expect(constraints['query.language']).toEqual('de')
    })
  })

  describe('getAggregations()', () => {
    it('should return an empty object when no params provided', () => {
      const ctx = { req: REQUEST, res: RESPONSE, query: {} }
      const builder = new RequestBuilder(ctx)

      const aggregations = builder.getAggregations()

      expect(aggregations).toEqual({})
    })

    it('should return makairaFilter when present in params', () => {
      const params = {
        makairaFilter: {
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

      expect(aggregations).toEqual(params['makairaFilter'])
    })
  })

  describe('getSorting()', () => {
    it('should return an empty object when no params provided', () => {
      const ctx = { req: REQUEST, res: RESPONSE, query: {} }
      const builder = new RequestBuilder(ctx)

      const sorting = builder.getSorting()

      expect(sorting).toEqual({})
    })

    it('should return sorting with uppercased keys sortOption starts with "ox"', () => {
      const params = {
        sortBy: 'oxvarminprice',
        order: 'desc',
      }
      const ctx = {
        req: REQUEST,
        res: RESPONSE,
        query: { ...params },
      }
      const builder = new RequestBuilder(ctx)

      const sorting = builder.getSorting()

      expect(sorting).toEqual({ OXVARMINPRICE: 'desc' })
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
        sortBy: 'oxvarminprice',
      }
      const ctx = {
        req: REQUEST,
        res: RESPONSE,
        query: { ...params },
      }
      const builder = new RequestBuilder(ctx)

      const sorting = builder.getSorting()

      expect(sorting).toEqual({ OXVARMINPRICE: 'asc' })
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

    it('should default to count of 36 and offset of 0', () => {
      const ctx = {
        req: REQUEST,
        res: RESPONSE,
      }
      const builder = new RequestBuilder(ctx)

      const pagination = builder.getPagination()

      expect(pagination).toEqual(['36', '0'])
    })
  })
})
