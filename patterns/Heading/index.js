function Heading(props) {
  const { size = '150', className = '', element = 'h1' } = props
  const Element = element
  const classes = `heading heading--${size} ${className}`

  return <Element className={classes}>{props.children}</Element>
}

export default Heading
export { default as headingVariants } from './variants.js'
