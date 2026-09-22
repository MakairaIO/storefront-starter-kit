import insertContentSnippets, { resolvePageContentSnippets } from '.'
import fetchSnippetData from '../fetchSnippetData'

jest.mock('../fetchSnippetData', () => jest.fn())

const snippetPlaceholder = (snippetId) => ({
  component: 'content-snippet',
  properties: { content: { snippetId } },
})

const teaser = (name) => ({
  component: 'teaser-hero',
  properties: { content: { name } },
})

describe('insertContentSnippets()', () => {
  beforeEach(() => {
    fetchSnippetData.mockReset()
  })

  it('returns elements unchanged when there are no content-snippet placeholders', async () => {
    const elements = [teaser('hero')]

    const result = await insertContentSnippets(elements, { language: 'de' })

    expect(result).toEqual(elements)
    expect(fetchSnippetData).not.toHaveBeenCalled()
  })

  it('replaces content-snippet placeholders with fetched snippet elements', async () => {
    fetchSnippetData.mockResolvedValue([
      {
        data: {
          snippetId: 'header-promo',
          config: { top: { elements: [teaser('from-snippet')] } },
        },
      },
    ])

    const result = await insertContentSnippets(
      [teaser('before'), snippetPlaceholder('header-promo'), teaser('after')],
      { language: 'de' }
    )

    expect(fetchSnippetData).toHaveBeenCalledWith({
      ids: ['header-promo'],
      language: 'de',
      ctx: undefined,
    })
    expect(result).toEqual([
      teaser('before'),
      teaser('from-snippet'),
      teaser('after'),
    ])
  })

  it('replaces every occurrence of the same snippet id', async () => {
    fetchSnippetData.mockResolvedValue([
      {
        data: {
          snippetId: 'shared',
          config: { top: { elements: [teaser('shared')] } },
        },
      },
    ])

    const result = await insertContentSnippets([
      snippetPlaceholder('shared'),
      snippetPlaceholder('shared'),
    ])

    expect(result).toEqual([teaser('shared'), teaser('shared')])
  })
})

describe('resolvePageContentSnippets()', () => {
  beforeEach(() => {
    fetchSnippetData.mockReset()
  })

  it('resolves snippets in landing page and listing slots', async () => {
    fetchSnippetData.mockResolvedValue([
      {
        data: {
          snippetId: 'promo',
          config: { top: { elements: [teaser('promo')] } },
        },
      },
    ])

    const pageData = {
      language: 'en',
      data: {
        config: {
          top: { elements: [snippetPlaceholder('promo')] },
          bottom: { elements: [teaser('bottom')] },
        },
        self: {
          contentElements: {
            top: { elements: [snippetPlaceholder('promo')] },
          },
        },
      },
    }

    await resolvePageContentSnippets(pageData)

    expect(pageData.data.config.top.elements).toEqual([teaser('promo')])
    expect(pageData.data.config.bottom.elements).toEqual([teaser('bottom')])
    expect(pageData.data.self.contentElements.top.elements).toEqual([
      teaser('promo'),
    ])
  })
})
