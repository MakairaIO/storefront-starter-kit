import normalizeSnippetResponse from './normalizeSnippetResponse'

describe('normalizeSnippetResponse()', () => {
  it('returns arrays unchanged', () => {
    const snippets = [{ data: { snippetId: 'promo' } }]

    expect(normalizeSnippetResponse(snippets)).toEqual(snippets)
  })

  it('normalizes an object keyed by snippet id', () => {
    const snippets = normalizeSnippetResponse({
      promo: {
        data: {
          config: { top: { elements: [{ component: 'teaser-hero' }] } },
        },
      },
    })

    expect(snippets[0].data.snippetId).toEqual('promo')
    expect(snippets[0].data.config.top.elements).toHaveLength(1)
  })

  it('wraps object values that have no data wrapper', () => {
    const snippets = normalizeSnippetResponse({
      promo: {
        config: { main: { elements: [{ component: 'teaser-hero' }] } },
      },
    })

    expect(snippets[0].data.snippetId).toEqual('promo')
    expect(snippets[0].data.config.main.elements).toHaveLength(1)
  })
})
