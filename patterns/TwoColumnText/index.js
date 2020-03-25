import classNames from 'classnames'
import { Heading, Copytext } from '..'

function TwoColumnText(props) {
  const { heading = '', columnLeft = '', columnRight = '' } = props

  const classes = classNames('two-column-text', {
    ['two-column-text--1-column']: columnRight == '',
    ['two-column-text--2-column']: columnRight != '',
  })

  return (
    <section className={classes}>
      {heading && <Heading>{heading}</Heading>}

      <Copytext
        dangerouslySetInnerHTML={{ __html: columnLeft }}
        className="two-column-text__column two-column-text__column--right"
      />

      {columnRight && (
        <Copytext
          dangerouslySetInnerHTML={{ __html: columnRight }}
          className="two-column-text__column two-column-text__column--left"
        />
      )}
    </section>
  )
}

export default TwoColumnText
export { default as twoColumnTextVariants } from './variants.js'
