import { useGlobalData } from '../../utils'
import { SearchResults } from '../../patterns'

export default function ProductListWithProps() {
  const { searchResult, params } = useGlobalData()
  const { page } = searchResult
  const { searchPhrase } = params

  return <SearchResults page={page} searchPhrase={searchPhrase} />
}
