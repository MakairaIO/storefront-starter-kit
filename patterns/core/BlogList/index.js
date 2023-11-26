import Image from './Image'
import Heading from '../Heading'
import ConditionalLink from '../ConditionalLink'
import Text from '../Text'
import { format } from 'date-fns'

const dummyDesc = `Der Winter steht vor der Tür und lässt die Herzen der Skitourenfreunde höher schlagen. 
Skitouren abseits präparierter Pisten sind für viele die schönste Art, Schnee und Natur zu genießen. 
Damit verbunden steht das Thema Lawinenkunde an erster Stelle. Lawinen sind ein komplexes Naturphänomen, das von vielen Faktoren beeinflusst wird.`

const dummyDate = '2023-11-24T08:06:57+00:00'

function BlogList({ blogData }) {
  return (
    <section className="blog-list">
      {blogData.length &&
        blogData.slice(0, 10).map((blog) => {
          const {
            id,
            url,
            title,
            publishDate = dummyDate,
            description = dummyDesc,
          } = blog
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
