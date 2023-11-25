import Header, { headerVariants } from '../../../patterns/core/Header'
import BlogDetail, {
  BlogDetailVariants,
} from '../../../patterns/core/BlogDetail'

const headerProps = headerVariants[0].props
const blogDetailProps = BlogDetailVariants[0].props

export default function BlogDetailPage(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
      <BlogDetail {...props} {...blogDetailProps} />
    </>
  )
}
