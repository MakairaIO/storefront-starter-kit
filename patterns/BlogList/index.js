import { formatDate } from '../../utils'
import Image from './Image'
import Heading from '../Heading'
import Text from '../Text'

import { ConditionalLink } from '..'
import LoadMore from './LoadMore'

function BlogList({ blogData, onClickLoadMore, showLoadMore }) {
  return (
    <section className="blog-list">
      {blogData.length > 0 &&
        blogData.map((blog) => {
          const { id, url, title, publishDate } = blog

          return (
            <ConditionalLink key={id} href={url} className="blog-list__tile">
              <Image {...blog} />

              <div className="blog-list__content">
                <Text className="blog-list__date">
                  {formatDate(publishDate)}
                </Text>

                <Heading
                  weight="semi-bold"
                  className="blog-list__title"
                  element="h4"
                >
                  {title}
                </Heading>
              </div>
            </ConditionalLink>
          )
        })}

      {showLoadMore && <LoadMore onClickLoadMore={onClickLoadMore} />}
    </section>
  )
}

export default BlogList
export { default as BlogListVariants } from './variants.js'
