import Image from './Image'
import Heading from '../Heading'
import Text from '../Text'
import { format } from 'date-fns'

const dummyDesc = `Der Winter steht vor der Tür und lässt die Herzen der Skitourenfreunde höher schlagen. 
Skitouren abseits präparierter Pisten sind für viele die schönste Art, Schnee und Natur zu genießen. 
Damit verbunden steht das Thema Lawinenkunde an erster Stelle. Lawinen sind ein komplexes Naturphänomen, das von vielen Faktoren beeinflusst wird.`

const dummyDate = '2023-11-24T08:06:57+00:00'

function BlogDetail(props) {
  const { title, description = dummyDesc, publishDate = dummyDate } = props

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
            {format(new Date(publishDate), 'MMMM dd, yyyy')}
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
