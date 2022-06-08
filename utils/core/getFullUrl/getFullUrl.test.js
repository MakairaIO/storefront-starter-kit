import getFullUrl from '.'

describe('getFullUrl()', () => {
  // Setup for consistent tests no matter where performed
  const OLD_ENV = process.env
  const SHOP_DOMAIN_MOCK = 'https://www.my-test-domain.com'
  const EXTERNAL_DOMAIN_MOCK = 'https://www.external-domain.com'

  beforeEach(() => {
    jest.resetModules() // this is important - it clears the cache

    process.env = {
      ...OLD_ENV,
      SHOP_DOMAIN: SHOP_DOMAIN_MOCK,
    }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  describe('internal URLs', () => {
    it('should return absolute input URLs with "http(s)" without modification', () => {
      const withHttps = SHOP_DOMAIN_MOCK + '/test'
      let { fullUrl, isExternalLink } = getFullUrl(withHttps)

      expect(fullUrl).toEqual(withHttps)
      expect(isExternalLink).toEqual(false)
    })

    it('should return absolute input URLs with "www" with added HTTPS scheme', () => {
      const withWWW = (SHOP_DOMAIN_MOCK + '/test').replace('https://', '')
      let { fullUrl, isExternalLink } = getFullUrl(withWWW)
      const expected = SHOP_DOMAIN_MOCK + '/test'

      expect(fullUrl).toEqual(expected)
      expect(isExternalLink).toEqual(false)
    })

    it('should return relative input URLs with added scheme and domain', () => {
      const relativeUrl = '/my-fancy-page'
      const { fullUrl, isExternalLink } = getFullUrl(relativeUrl)
      const expectedUrl = SHOP_DOMAIN_MOCK + relativeUrl

      expect(fullUrl).toEqual(expectedUrl)
      expect(isExternalLink).toEqual(false)
    })

    it('should return normalize input URLs containing double slashes', () => {
      const relativeUrl = '/my-fancy-page//deep//link'
      const { fullUrl, isExternalLink } = getFullUrl(relativeUrl)
      const expectedUrl = SHOP_DOMAIN_MOCK + '/my-fancy-page/deep/link'

      expect(fullUrl).toEqual(expectedUrl)
      expect(isExternalLink).toEqual(false)
    })

    it('should return homepage when no url is provided', () => {
      const emptyUrl = ''
      const { fullUrl, isExternalLink } = getFullUrl(emptyUrl)
      const expectedUrl = SHOP_DOMAIN_MOCK + '/'

      expect(fullUrl).toEqual(expectedUrl)
      expect(isExternalLink).toEqual(false)
    })

    it('should return relative URLs without leading slash with added slash, scheme and domain', () => {
      const relativeUrl = 'my-fancy-page.html'
      const { fullUrl, isExternalLink } = getFullUrl(relativeUrl)
      const expectedUrl = SHOP_DOMAIN_MOCK + '/my-fancy-page.html'

      expect(fullUrl).toEqual(expectedUrl)
      expect(isExternalLink).toEqual(false)
    })
  })

  describe('external URLs', () => {
    it('should return absolute input URLs with "http(s)" without modification', () => {
      const externalUrl = EXTERNAL_DOMAIN_MOCK
      const { fullUrl, isExternalLink } = getFullUrl(externalUrl)

      expect(fullUrl).toEqual(externalUrl)
      expect(isExternalLink).toEqual(true)
    })

    it('should return absolute input URLs with "www" with added HTTPS scheme', () => {
      const withWWW = (EXTERNAL_DOMAIN_MOCK + '/test').replace('https://', '')
      let { fullUrl, isExternalLink } = getFullUrl(withWWW)
      const expected = EXTERNAL_DOMAIN_MOCK + '/test'

      expect(fullUrl).toEqual(expected)
      expect(isExternalLink).toEqual(true)
    })
  })
})
