import { isUrlMatchRules } from './isUrlMatchRules'

describe('isUrlMatchRules with url', () => {
  beforeEach(() => {
    const url = 'http://dummy.com'
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: '',
        search: '',
      },
      writable: true, // possibility to override
    })
  })

  it('should match url full pathname', () => {
    window.location.pathname = '/abc'
    const rules = [
      {
        key: 'url',
        value: '/abc',
        operator: 'is',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should not match url full pathname', () => {
    window.location.pathname = '/abc'
    const rules = [
      {
        key: 'url',
        value: '/abcd',
        operator: 'is',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(false)
  })

  it('should match url contains string in pathname', () => {
    window.location.pathname = '/default-url-testing'
    const rules = [
      {
        key: 'url',
        value: 'testing',
        operator: 'contains',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should not match url contains string in pathname', () => {
    window.location.pathname = '/default-url-testing'
    const rules = [
      {
        key: 'url',
        value: 'abc',
        operator: 'contains',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(false)
  })

  it('should match url begins with string in pathname', () => {
    window.location.pathname = '/default-url-testing'
    const rules = [
      {
        key: 'url',
        value: '/default',
        operator: 'begins',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should not match url begins with string in pathname', () => {
    window.location.pathname = '/default-url-testing'
    const rules = [
      {
        key: 'url',
        value: 'abc',
        operator: 'begins',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(false)
  })

  it('should match url wild card in pathname 1', () => {
    window.location.pathname = '/default-url-testing'
    const rules = [
      {
        key: 'url',
        value: '/default*',
        operator: 'matches',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should match url wild card in pathname 2', () => {
    window.location.pathname = '/default/url/testing'
    const rules = [
      {
        key: 'url',
        value: '/default/*',
        operator: 'matches',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should match url wild card in pathname 3', () => {
    window.location.pathname = '/default/url/testing'
    const rules = [
      {
        key: 'url',
        value: '/default/*/testing',
        operator: 'matches',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should match url wild card in pathname 4', () => {
    window.location.pathname = '/default/url/testing'
    const rules = [
      {
        key: 'url',
        value: '/*/testing',
        operator: 'matches',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should match url wild card in pathname 5', () => {
    window.location.pathname = '/'
    const rules = [
      {
        key: 'url',
        value: '*',
        operator: 'matches',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should not match url wild card in pathname', () => {
    window.location.pathname = '/default/url/testing'
    const rules = [
      {
        key: 'url',
        value: '/*/testing1',
        operator: 'matches',
        queryName: undefined,
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(false)
  })
})

describe('isUrlMatchRules with query params', () => {
  beforeEach(() => {
    const url = 'http://dummy.com'
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: '',
        search: '',
      },
      writable: true, // possibility to override
    })
  })

  it('should match params', () => {
    window.location.search = '?dob=1-1-2000&name=john'
    const rules = [
      {
        key: 'query',
        value: 'john',
        operator: 'is',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should not match params', () => {
    window.location.search = '?name=john'
    const rules = [
      {
        key: 'query',
        value: 'abc',
        operator: 'is',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(false)
  })

  it('should match url contains param value', () => {
    window.location.search = '?name=default-query-testing'
    const rules = [
      {
        key: 'query',
        value: 'query-testing',
        operator: 'contains',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should not match url contains param value', () => {
    window.location.search = '?name=default-query-testing'
    const rules = [
      {
        key: 'query',
        value: 'abc',
        operator: 'contains',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(false)
  })

  it('should match url begins with string in param value', () => {
    window.location.search = '?name=default-query-testing'
    const rules = [
      {
        key: 'query',
        value: 'default',
        operator: 'begins',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should not match url begins with string in param value', () => {
    window.location.search = '?name=default-query-testing'
    const rules = [
      {
        key: 'query',
        value: 'abc',
        operator: 'begins',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(false)
  })

  it('should match url wild card in param value', () => {
    window.location.search = '?name=default-query-testing'
    const rules = [
      {
        key: 'query',
        value: '*-query*',
        operator: 'matches',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should match url wild card in param value 2', () => {
    window.location.search = '?name=default-query-testing'
    const rules = [
      {
        key: 'query',
        value: '*default*',
        operator: 'matches',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })

  it('should match url wild card in param value 3', () => {
    window.location.search = '?name=default-query-testing'
    const rules = [
      {
        key: 'query',
        value: '*testing',
        operator: 'matches',
        queryName: 'name',
      },
    ]

    const isMatched = isUrlMatchRules(rules)
    expect(isMatched).toEqual(true)
  })
})
