import ProductList from './ProductListWithProps'
import { Breadcrumb, ContentElements } from '../../../patterns'
import { useGlobalData } from '../../../utils'
import Metadata from '../Metadata'

export default function BundlePage() {
  const { pageData } = useGlobalData()

  return (
    <main>
      <Metadata
        title={pageData.data.self.title}
        keywords={pageData.data.self.meta_keywords}
        description={pageData.data.self.meta_description}
      />

      <Breadcrumb product={pageData.data.self} />
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
