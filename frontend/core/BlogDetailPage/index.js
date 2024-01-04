import { useGlobalData } from '../../../utils'
import { Breadcrumb, ContentElements, BlogDetail } from '../../../patterns'
import Metadata from '../Metadata'

function BlogDetailPage() {
  const { pageData } = useGlobalData()
  const blogId = pageData.data.self.id

  return (
    <main>
      <Metadata
        title={pageData.data.self.metadata?.title}
        keywords={pageData.data.self.metadata?.keywords}
        description={pageData.data.self.metadata?.description}
        robotFollow={pageData.data.self.metadata?.robotFollow}
        robotIndex={pageData.data.self.metadata?.robotIndex}
      />

      <Breadcrumb product={pageData.data.self} />

      <ContentElements
        elements={pageData.data.self.contentElements?.top?.elements}
      />

      <BlogDetail key={blogId} {...pageData.data.self} />

      <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      />
    </main>
  )
}

export default BlogDetailPage
