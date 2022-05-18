import stripSlashes from '.'

describe('stripSlashes()', () => {
  it('should remove leading slashes', () => {
    const path = '/search'
    const stripped = stripSlashes(path)

    expect(stripped).toEqual('search')
  })

  it('should remove trailing slashes', () => {
    const path = 'search/'
    const stripped = stripSlashes(path)

    expect(stripped).toEqual('search')
  })

  it('should remove all slashes', () => {
    const path = '/search/'
    const stripped = stripSlashes(path)

    expect(stripped).toEqual('search')
  })
})
