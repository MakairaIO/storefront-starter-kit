import classNames from 'classnames'
import Heading from '../Heading/index.js'

function OmrReviews(props) {
  const {
    title = '',
    anchorId = '',
    theme,
    reduceTopSpace,
    reduceMaxWidth,
    alignment,
  } = props

  const classes = classNames('pattern omr-reviews', {
    [`omr-reviews__theme--${theme}`]: theme,
    'omr-reviews__reduce-top-space': reduceTopSpace,
    [`omr-reviews__alignment--${alignment}`]: alignment,
  })

  const classesWrapper = classNames('omr-reviews__wrapper', {
    'omr-reviews__reduce-max-width': reduceMaxWidth,
  })
  return (
    <section id={anchorId} className={classes}>
      <div className={classesWrapper}>
        {title && <Heading level={0}>{title}</Heading>}
        <div className="orm-reviews__link--wrapper">
          <a
            className="orm-reviews__link"
            title={title}
            href="https://omr.com/de/reviews/product/makaira"
          >
            <img
              width="200"
              height="150"
              src="https://omr.com/de/reviews/widget/productTileLight/makaira.png"
              alt={title}
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default OmrReviews
export { default as omrReviewsVariants } from './variants.js'
