export default function flattenSnippetData(snippets = []) {
  return snippets.map((snippet) => {
    const id = snippet.data.snippetId
    const elements = snippet.data.config?.main?.elements ?? []

    return {
      id,
      elements,
    }
  })
}
