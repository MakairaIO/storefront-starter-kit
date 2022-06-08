import isMailToLink from '.'

describe('isMailToLink()', () => {
  it('should return true for hrefs with "mailto"', () => {
    const href = 'mailto:hello@makaira.io'
    const result = isMailToLink(href)

    expect(result).toEqual(true)
  })

  it('should return false for relative links', () => {
    const href = '/my-fancy-page'
    const result = isMailToLink(href)

    expect(result).toEqual(false)
  })

  it('should return false for absolute links', () => {
    const href = 'https://www.my-test-domain.com/test'
    const result = isMailToLink(href)

    expect(result).toEqual(false)
  })
})
