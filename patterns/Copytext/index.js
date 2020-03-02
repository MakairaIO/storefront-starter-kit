function Copytext(props) {
  const { className = '' } = props
  const classes = `copytext ${className}`

  return <p className={classes}>{props.children}</p>
}

export default Copytext
export { default as copytextVariants } from './variants.js'
