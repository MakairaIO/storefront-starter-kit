import { getFullUrl } from '..'

describe('getFullUrl()', () => {
  // Setup for consistent tests no matter where performed
  const OLD_ENV = process.env
  const MOCK_DOMAIN = 'https://my-test-domain.com'

  beforeEach(() => {
    jest.resetModules() // this is important - it clears the cache

    process.env = {
      ...OLD_ENV,
      SHOP_DOMAIN: MOCK_DOMAIN,
    }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('should return input URLs starting with "http(s)" without modification', () => {
    const withHttp = 'http://www.test.com'
    let fullUrl = getFullUrl(withHttp)

    expect(fullUrl).toEqual(withHttp)

    const withHttps = 'https://www.test.com'
    fullUrl = getFullUrl(withHttps)

    expect(fullUrl).toEqual(withHttps)
  })

  it('should return input URLs starting with "www" with added HTTPS scheme', () => {
    const withWWW = 'www.test.com'
    const fullUrl = getFullUrl(withWWW)
    const expected = 'https://' + withWWW

    expect(fullUrl).toEqual(expected)
  })

  it('should return relative input URLs with added scheme and domain from `window.location`', () => {
    const relativeUrl = '/my-fancy-page'
    const fullUrl = getFullUrl(relativeUrl)
    const expected = MOCK_DOMAIN + relativeUrl

    expect(fullUrl).toEqual(expected)
  })

  it('should return normalize input URLs containing double slashes', () => {
    const relativeUrl = '/my-fancy-page//deep//link'
    const fullUrl = getFullUrl(relativeUrl)
    const expected = MOCK_DOMAIN + '/my-fancy-page/deep/link'

    expect(fullUrl).toEqual(expected)
  })

  it('should return homepage when no url is provided', () => {
    const emptyUrl = ''
    const fullUrl = getFullUrl(emptyUrl)
    const expected = MOCK_DOMAIN + '/'

    expect(fullUrl).toEqual(expected)
  })
})
