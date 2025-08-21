import classNames from 'classnames'

function Text(props) {
  const {
    size = 'aphrodite',
    weight = 'regular',
    className = '',
    element = 'span',
    ...rest // dangerouslySetInnerHTML etc.
  } = props

  const Element = element

  const classes = classNames(
    className,
    'text',
    `text--${size}`,
    `text--${weight}`
  )

  return (
    <Element className={classes} {...rest}>
      {props.children}
    </Element>
  )
}

export default Text
export { default as textVariants } from './variants.js'
