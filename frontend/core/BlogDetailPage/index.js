import { useEffect } from 'react'
import {
  useGlobalData,
  useTranslation,
  GTM,
  prepareTrackingItem,
} from '../../../utils'
import { Breadcrumb, ContentElements, BlogDetail } from '../../../patterns'
import Metadata from '../Metadata'

function BlogDetailPage() {
  const { language } = useTranslation()
  const { pageData } = useGlobalData()
  const blogId = pageData.data.self.id

  useEffect(() => {
    function trackViewEvent() {
      if (pageData.data?.self) {
        GTM.trackEvent({
          event: 'view_item',
          ecommerce: {
            items: [prepareTrackingItem(pageData.data.self)],
          },
          _clear: true,
        })
      }
    }

    trackViewEvent()
  }, [blogId, language, pageData])

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
