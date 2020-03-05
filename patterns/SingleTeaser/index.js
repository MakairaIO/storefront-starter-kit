import { Heading, Copytext, Button } from '..'

function SingleTeaser(props) {
  const { headline = '', text = '', image = {}, button = {} } = props

  return (
    <section className="single-teaser">
      <picture className="single-teaser__image">
        <img src={image.src} alt={image.alt} />
      </picture>

      <div className="single-teaser__content">
        <Heading>{headline}</Heading>

        <Copytext>{text}</Copytext>

        {button.isVisible && (
          <Button className="single-teaser__button">{button.text}</Button>
        )}
      </div>
    </section>
  )
}

export default SingleTeaser
export { default as singleTeaserVariants } from './variants.js'
