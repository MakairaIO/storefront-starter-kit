import classNames from 'classnames'
import { Icon } from '..'

function Button(props) {
  const {
    type = '',
    className = '',
    icon = '',
    iconPosition = 'right',
    href = '',
    children,
    ...rest
  } = props

  const classes = classNames(className, 'button', {
    [`button--${type}`]: type,
    [`button--icon`]: icon,
    [`button--icon-only`]: icon && !children,
    [`button--icon-${iconPosition}`]: icon && iconPosition && children,
  })

  if (href != '') {
    return (
      <a href={href} className={classes} {...rest}>
        <span className="button__text">{children}</span>

        {icon && <Icon symbol={icon} />}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      <span className="button__text">{children}</span>

      {icon && <Icon symbol={icon} />}
    </button>
  )
}

export default Button
export { default as buttonVariants } from './variants.js'
