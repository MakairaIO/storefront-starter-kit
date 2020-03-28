import classNames from 'classnames'
import { Heading, Copytext } from '../..'

function MultiColumnText(props) {
  const {
    heading = '',
    columnLeft = '',
    columnMiddle = '',
    columnRight = '',
    backgroundColor = '',
    textColor = 'dark',
  } = props

  const classes = classNames('multi-column-text', {
    ['multi-column-text--1-column']: columnMiddle == '' && columnRight == '',
    ['multi-column-text--2-column']:
      (columnMiddle == '' && columnRight != '') ||
      (columnMiddle != '' && columnRight == ''),
    ['multi-column-text--3-column']: columnMiddle != '' && columnRight != '',
  })

  const sectionClasses = classNames('multi-column-text__section', {
    [`multi-column-text__section--with-backgrund-${backgroundColor}`]:
      backgroundColor != '',
    [`multi-column-text__section--text-color-${textColor}`]: !!textColor,
  })

  return (
    <section className={sectionClasses}>
      <div className={classes}>
        {heading && <Heading>{heading}</Heading>}

        <Copytext
          dangerouslySetInnerHTML={{ __html: columnLeft }}
          className="multi-column-text__column multi-column-text__column--right"
        />

        {columnMiddle && (
          <Copytext
            dangerouslySetInnerHTML={{ __html: columnMiddle }}
            className="multi-column-text__column multi-column-text__column--middle"
          />
        )}

        {columnRight && (
          <Copytext
            dangerouslySetInnerHTML={{ __html: columnRight }}
            className="multi-column-text__column multi-column-text__column--left"
          />
        )}
      </div>
    </section>
  )
}

export default MultiColumnText
export { default as multiColumnTextVariants } from './variants.js'
