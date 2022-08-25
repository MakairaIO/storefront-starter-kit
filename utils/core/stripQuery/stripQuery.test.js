import stripQuery from '.'

describe('stripQuery()', () => {
  it('should remove the question mark character from query string', () => {
    const queryString = '?filter[price_to]=32'
    const stripped = stripQuery(queryString)

    expect(stripped).toEqual('filter[price_to]=32')
  })
})
