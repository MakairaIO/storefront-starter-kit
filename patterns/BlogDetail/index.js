import { formatDate } from '../../utils'
import Image from './Image'
import Heading from '../Heading'
import Text from '../Text'

function BlogDetail(props) {
  const { title, publishDate } = props

  return (
    <>
      <section className="blog-detail">
        <Image {...props} />

        <div className="blog-detail__heading">
          <Heading
            element="h1"
            size="fortuna"
            weight="bold"
            className="blog-detail__title"
          >
            {title}
          </Heading>

          <Text size="bacchus" className="blog-detail__date">
            {formatDate(publishDate)}
          </Text>
        </div>
      </section>
    </>
  )
}

export default BlogDetail
export { default as BlogDetailVariants } from './variants.js'
