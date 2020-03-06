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
  } = props

  const classes = classNames('button', className, {
    [`button--${type}`]: type,
    [`button--icon`]: icon,
    [`button--icon-only`]: icon && !children,
    [`button--icon-${iconPosition}`]: icon && iconPosition && children,
  })

  if (href != '') {
    return (
      <a href={href} className={classes}>
        {props.children}

        {icon && <Icon symbol={icon} />}
      </a>
    )
  }

  return (
    <button type="button" className={classes}>
      <span className="button__text">{children}</span>

      {icon && <Icon symbol={icon} />}
    </button>
  )
}

export default Button
export { default as buttonVariants } from './variants.js'
