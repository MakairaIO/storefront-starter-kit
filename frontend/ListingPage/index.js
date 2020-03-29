import { useGlobalData } from '../../utils'
import { ContentElements } from '../../patterns'
import Metadata from './Metadata'
import ProductList from './ProductListWithProps'

function ListingPage() {
  const { pageData } = useGlobalData()

  return (
    <main>
      <Metadata />
      <ContentElements
        elements={pageData.data.self.contentElements?.top?.elements}
      />
      <ProductList />
      <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      />
    </main>
  )
}

export default ListingPage
