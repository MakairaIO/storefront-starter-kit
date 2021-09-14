import classNames from 'classnames'
import { Heading, Copytext } from '../..'

function MultiColumnText(props) {
  const {
    heading = '',
    headingAlign = 'left',
    columnLeft = '',
    columnMiddle = '',
    columnRight = '',
    backgroundColor = '',
    textColor = 'dark',
  } = props

  const sectionClasses = classNames('multi-column-text__section', {
    [`multi-column-text__section--with-background-${backgroundColor}`]:
      backgroundColor != '',
    [`multi-column-text__section--text-color-${textColor}`]: !!textColor,
  })

  const wrapperClasses = classNames('multi-column-text', {
    ['multi-column-text--1-column']: columnMiddle == '' && columnRight == '',
    ['multi-column-text--2-column']:
      (columnMiddle == '' && columnRight != '') ||
      (columnMiddle != '' && columnRight == ''),
    ['multi-column-text--3-column']: columnMiddle != '' && columnRight != '',
  })

  const headingClass = `heading-${headingAlign}`

  return (
    <section className={sectionClasses}>
      <div className={wrapperClasses}>
        {heading && <Heading className={headingClass}>{heading}</Heading>}

        <Copytext
          dangerouslySetInnerHTML={{ __html: columnLeft }}
          className="multi-column-text__column multi-column-text__column--left"
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
            className="multi-column-text__column multi-column-text__column--right"
          />
        )}
      </div>
    </section>
  )
}

export default MultiColumnText
export { default as multiColumnTextVariants } from './variants.js'
