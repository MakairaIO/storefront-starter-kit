import classNames from 'classnames'
import Title from './Title'
import Content from './Content'

function Promotion(props) {
  const {
    heading = {},
    content = {},
    variant = 'default',
    // invert = false,
  } = props

  const classes = classNames('promotion', `promotion--${variant}`)

  return (
    <section className={classes}>
      <div className="promotion__container">
        <Title {...heading} />

        <Content {...content} />
      </div>
    </section>
  )
}

export default Promotion
export { default as promotionVariants } from './variants.js'
