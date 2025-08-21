import Metadata from './Metadata'
import PageList from './PageListWithProps'
import { InformationModal } from '../../patterns'

function SearchResultPage() {
  return (
    <main>
      <Metadata />
      <PageList />
      <InformationModal />
    </main>
  )
}

export default SearchResultPage
