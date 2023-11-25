import { useEffect } from 'react'
import { useGlobalData, useTranslation } from '../../../utils'
// import { Breadcrumb, ContentElements, BlogList } from '../../../patterns'
import Metadata from '../Metadata'

function BlogListingPage(props) {
  const { language } = useTranslation()
  const { pageData } = useGlobalData()

  useEffect(() => {
    console.log(props)
  }, [language, pageData])

  return (
    <main>
      <Metadata
      // title={pageData.data.self.metadata?.title}
      // keywords={pageData.data.self.metadata?.keywords}
      // description={pageData.data.self.metadata?.description}
      // robotFollow={pageData.data.self.metadata?.robotFollow}
      // robotIndex={pageData.data.self.metadata?.robotIndex}
      />
      {/* <Breadcrumb product={pageData.data.self} /> */}
      {/* <ContentElements
        elements={pageData.data.self.contentElements?.top?.elements}
      />
      <BlogList {...pageData.data.self} />
      <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      /> */}
    </main>
  )
}

export default BlogListingPage
