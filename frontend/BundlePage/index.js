import ProductList from './ProductListWithProps'
import { ContentElements } from '../../patterns'
import { useGlobalData } from '../../utils'

export default function BundlePage() {
  const { pageData } = useGlobalData()

  return (
    <main>
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
