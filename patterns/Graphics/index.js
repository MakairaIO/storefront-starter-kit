import { ConditionalLink } from '..'
import { useConfiguration } from '../../utils'

function Graphics(props) {
  const { graphics = [], anchorId = '' } = props
  const { getImageLink } = useConfiguration()

  return (
    <section id={anchorId} className="graphics-component">
      {graphics.map(({ uuid, image, link }) => {
        const imageLink = image.src ? getImageLink({ source: image.src }) : ''

        if (!imageLink) return null

        return (
          <ConditionalLink
            key={uuid}
            href={link}
            className="graphics-component__item"
          >
            <img src={imageLink} alt={image.alt} />
          </ConditionalLink>
        )
      })}
    </section>
  )
}

export default Graphics
export { default as graphicsVariants } from './variants.js'
