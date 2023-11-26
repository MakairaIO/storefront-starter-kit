import { useTranslation } from '../../../utils'
import { Breadcrumb, BlogList } from '../../../patterns'
import Metadata from '../Metadata'

function BlogListingPage(props) {
  const { language } = useTranslation()

  return (
    <main>
      <Metadata
        title="Blog Listing Page"
        robotFollow={false}
        robotIndex={false}
      />
      <Breadcrumb breadcrumb={[{ text: 'Blog', link: '/blog/' + language }]} />
      <BlogList {...props} />
      {/* <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      /> */}
    </main>
  )
}

export default BlogListingPage
