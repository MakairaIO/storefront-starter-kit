import Image from './Image'
import Heading from '../Heading'
import ConditionalLink from '../ConditionalLink'
import Text from '../Text'
import { format } from 'date-fns'

import variants from './variants'

const dummyDesc = variants[0]?.props?.blogData[0]?.description

function BlogList({ blogData }) {
  return (
    <section className="blog-list">
      {blogData.length &&
        blogData.slice(0, 10).map((blog) => {
          const { id, url, title, publishDate, description = dummyDesc } = blog
          return (
            <ConditionalLink key={id} href={url} className="blog-list__tile">
              <Image {...blog} />
              <div className="blog-list__content">
                <Text className="blog-list__date">
                  {format(new Date(publishDate), 'MMM dd, yyyy')}
                </Text>
                <Heading
                  weight="semi-bold"
                  className="blog-list__title"
                  element="h4"
                >
                  {title}
                </Heading>
                <Text className="blog-list__description">{description}</Text>
              </div>
            </ConditionalLink>
          )
        })}
    </section>
  )
}

export default BlogList
export { default as BlogListVariants } from './variants.js'
