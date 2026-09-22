import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ContentElements from '../ContentElements'
import {
  fetchSnippetData,
  getSnippetElements,
  useTranslation,
} from '../../../utils'

const ResolvedSnippetIdsContext = createContext(new Set())

export default function ContentSnippet({ snippetId, id, snippet }) {
  const resolvedId = snippetId || id || snippet
  const { language } = useTranslation()
  const resolvedIds = useContext(ResolvedSnippetIdsContext)
  const [elements, setElements] = useState([])

  const nextResolvedIds = useMemo(() => {
    const next = new Set(resolvedIds)
    if (resolvedId) next.add(String(resolvedId))
    return next
  }, [resolvedIds, resolvedId])

  useEffect(() => {
    if (!resolvedId || resolvedIds.has(String(resolvedId))) return

    let cancelled = false

    fetchSnippetData({ ids: [resolvedId], language })
      .then((snippets) => {
        if (cancelled) return

        const match =
          snippets.find(
            (item) => String(item.data?.snippetId) === String(resolvedId)
          ) || snippets[0]

        setElements(getSnippetElements(match))
      })
      .catch((error) => {
        console.error(error)
      })

    return () => {
      cancelled = true
    }
  }, [resolvedId, language, resolvedIds])

  if (!resolvedId || resolvedIds.has(String(resolvedId))) return null

  return (
    <ResolvedSnippetIdsContext.Provider value={nextResolvedIds}>
      <ContentElements elements={elements} />
    </ResolvedSnippetIdsContext.Provider>
  )
}
