import classNames from 'classnames'

function Copytext(props) {
  const { size = '150', className = '' } = props
  const classes = classNames(className, 'copytext', `copytext--${size}`)

  return <p className={classes}>{props.children}</p>
}

export default Copytext
export { default as copytextVariants } from './variants.js'
