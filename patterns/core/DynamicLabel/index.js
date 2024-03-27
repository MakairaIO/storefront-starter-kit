import classNames from 'classnames'

function DynamicLabel(props) {
  const { children, className } = props

  const labelClass = classNames('dynamic-label', className)

  return <span className={labelClass}>{children}</span>
}

export default DynamicLabel
export { default as dynamicLabelVariants } from './variants.js'
