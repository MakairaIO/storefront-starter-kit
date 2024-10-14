import { useEffect } from 'react'
import { useGlobalData, useTranslation, GTM, formatDate } from '../../../utils'
import Image from './Image'
import Heading from '../Heading'
import ConditionalLink from '../ConditionalLink'
import Text from '../Text'

import variants from './variants'

const dummyDesc = variants[0]?.props?.blogData[0]?.description

function BlogList({ blogData }) {
  const { language } = useTranslation()
  const { pageData } = useGlobalData()

  useEffect(() => {
    function trackViewEvent() {
      const page_location =
        document.location.origin + document.location.pathname
      const page_title = document.title
      const page_type = 'post'

      GTM.trackEvent({
        event: 'page_view',
        page_location,
        page_title,
        page_type,
      })
    }

    trackViewEvent()
  }, [language, pageData])

  return (
    <section className="blog-list">
      {blogData.length &&
        blogData.map((blog) => {
          const { id, url, title, publishDate, description = dummyDesc } = blog

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
