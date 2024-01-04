import { formatDate } from '../../../utils'
import Image from './Image'
import Heading from '../Heading'
import Text from '../Text'

import variants from './variants'

const dummyDesc = variants[0]?.props.description

function BlogDetail(props) {
  const { title, publishDate, description = dummyDesc } = props

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

          <Text size="bacchus" element="p" className="blog-detail__description">
            {description}
          </Text>
        </div>
      </section>
    </>
  )
}

export default BlogDetail
export { default as BlogDetailVariants } from './variants.js'
