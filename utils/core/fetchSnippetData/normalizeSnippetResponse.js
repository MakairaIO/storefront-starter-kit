export default function normalizeSnippetResponse(page) {
  if (Array.isArray(page)) return page.filter(Boolean)

  if (!page || typeof page !== 'object') return []

  return Object.entries(page)
    .map(([id, snippet]) => {
      if (!snippet) return null

      if (snippet.data) {
        return {
          ...snippet,
          data: {
            ...snippet.data,
            snippetId: snippet.data.snippetId ?? id,
          },
        }
      }

      return {
        data: {
          ...snippet,
          snippetId: snippet.snippetId ?? id,
        },
      }
    })
    .filter(Boolean)
}
