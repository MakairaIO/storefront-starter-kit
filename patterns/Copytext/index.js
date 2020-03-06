import classNames from 'classnames'

function Copytext(props) {
  const { className = '' } = props
  const classes = classNames(className, 'copytext')

  return <p className={classes}>{props.children}</p>
}

export default Copytext
export { default as copytextVariants } from './variants.js'
