import { getCheckoutUrl } from '.'

describe('getCheckoutUrl', () => {
  test('reads the url of an existing cart', () => {
    const raw = {
      getCheckout: { data: { node: { checkoutUrl: 'https://a' } } },
    }
    expect(getCheckoutUrl(raw)).toBe('https://a')
  })

  test('reads the url of a newly created cart', () => {
    const raw = {
      createCheckout: {
        data: { cartCreate: { cart: { checkoutUrl: 'https://b' } } },
      },
    }
    expect(getCheckoutUrl(raw)).toBe('https://b')
  })

  test('returns undefined when there is no cart', () => {
    expect(getCheckoutUrl({})).toBeUndefined()
    expect(getCheckoutUrl(undefined)).toBeUndefined()
  })
})
