import ProductList from './ProductListWithProps'
import { Breadcrumb, ContentElements } from '../../../patterns'
import { useGlobalData } from '../../../utils'
import Metadata from '../Metadata'

export default function BundlePage() {
  const { pageData } = useGlobalData()

  let metadata = pageData?.data?.metadata || {}
  metadata = Object.keys(metadata).reduce((prev, cur) => {
    if (metadata[cur]) {
      prev[cur] = metadata[cur]
    }
    return prev
  }, {})

  const {
    seoTitle = pageData?.data?.self?.title,
    keywords = pageData?.data?.self?.meta_keywords,
    description = pageData?.data?.self?.meta_description,
    ...additionalMetadata
  } = metadata

  return (
    <main>
      <Metadata
        title={pageData?.data?.self?.title}
        keywords={keywords}
        description={description}
        additionalMetadata={{ ...additionalMetadata, title: seoTitle }}
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
