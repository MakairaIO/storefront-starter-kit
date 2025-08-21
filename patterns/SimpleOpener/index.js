import classNames from 'classnames'

import { Heading, ConditionalLink } from '..'
import Image from './Image'

function SimpleOpener(props) {
  const {
    heading,
    image = {},
    link = '',
    anchorId = '',
    theme = 'none',
    reduceTopSpace = false,
  } = props

  const classes = classNames('pattern simple-opener', {
    [`simple-opener__theme--${theme}`]: theme,
    'simple-opener__reduced-top-space': reduceTopSpace,
  })

  return (
    <section id={anchorId} className={classes}>
      {heading && (
        <Heading className="simple-opener__heading">{heading}</Heading>
      )}
      <ConditionalLink href={link}>
        <Image {...image} />
      </ConditionalLink>
    </section>
  )
}

export default SimpleOpener
export { default as simpleOpenerVariants } from './variants.js'
