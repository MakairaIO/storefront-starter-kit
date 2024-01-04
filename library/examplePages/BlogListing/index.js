import Header, { headerVariants } from '../../../patterns/core/Header'
import BlogList, { BlogListVariants } from '../../../patterns/core/BlogList'

const headerProps = headerVariants[0].props
const blogListProps = BlogListVariants[0].props

export default function BlogListingPage(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
      <BlogList {...props} {...blogListProps} />
    </>
  )
}
