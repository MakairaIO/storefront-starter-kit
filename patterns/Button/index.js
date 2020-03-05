import { Icon } from '..'

function Button(props) {
  const {
    type = '',
    className = '',
    icon = '',
    iconPosition = 'right',
    href = '',
  } = props

  const typeClasses = type != '' ? 'button--' + type : ''
  const iconClasses = icon && iconPosition ? 'button--icon-' + iconPosition : ''

  const classes = `button ${typeClasses} ${iconClasses} ${className}`

  if (href != '') {
    return (
      <a href={href} className={classes}>
        {props.children}
      </a>
    )
  }

  return (
    <button type="button" className={classes}>
      <span className="button__text">{props.children}</span>

      {icon && <Icon symbol={icon} />}
    </button>
  )
}

export default Button
export { default as buttonVariants } from './variants.js'
