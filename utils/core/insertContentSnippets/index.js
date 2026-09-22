import fetchSnippetData from '../fetchSnippetData'

function getSnippetElements(snippet) {
  return (
    snippet.data?.config?.top?.elements ??
    snippet.data?.config?.main?.elements ??
    []
  )
}

export default async function insertContentSnippets(
  elements = [],
  { language = '', ctx } = {}
) {
  const contentSnippets = elements.filter(
    (item) => item.component === 'content-snippet'
  )

  if (!contentSnippets.length) return elements

  const contentSnippetIds = [
    ...new Set(
      contentSnippets
        .map((item) => item.properties?.content?.snippetId)
        .filter(Boolean)
    ),
  ]

  if (!contentSnippetIds.length) return elements

  const contentSnippetsData = await fetchSnippetData({
    ids: contentSnippetIds,
    language,
    ctx,
  })

  let nextElements = elements

  contentSnippetsData.forEach((snippet) => {
    const snippetId = snippet.data?.snippetId
    const snippetElements = getSnippetElements(snippet)

    if (!snippetId) return

    let snippetElementIndex = nextElements.findIndex(
      (item) =>
        item.component === 'content-snippet' &&
        item.properties?.content?.snippetId === snippetId
    )

    while (snippetElementIndex !== -1) {
      nextElements = [
        ...nextElements.slice(0, snippetElementIndex),
        ...snippetElements,
        ...nextElements.slice(snippetElementIndex + 1),
      ]

      snippetElementIndex = nextElements.findIndex(
        (item) =>
          item.component === 'content-snippet' &&
          item.properties?.content?.snippetId === snippetId
      )
    }
  })

  return nextElements
}

export async function resolvePageContentSnippets(pageData, options = {}) {
  if (!pageData?.data) return

  const language = options.language ?? pageData.language ?? ''
  const ctx = options.ctx
  const slots = [
    pageData.data.config?.top,
    pageData.data.config?.bottom,
    pageData.data.self?.contentElements?.top,
    pageData.data.self?.contentElements?.bottom,
  ].filter((slot) => Array.isArray(slot?.elements))

  await Promise.all(
    slots.map(async (slot) => {
      slot.elements = await insertContentSnippets(slot.elements, {
        language,
        ctx,
      })
    })
  )
}
