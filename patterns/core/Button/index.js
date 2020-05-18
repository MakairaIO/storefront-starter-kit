import classNames from 'classnames'
import { Icon, ConditionalLink } from '../..'

function Button(props) {
  const {
    variant = 'secondary',
    className = '',
    icon = '',
    iconPosition = 'right',
    href = '',
    children,
    ...rest
  } = props

  const classes = classNames(className, 'button', {
    [`button--${variant}`]: variant,
    [`button--icon`]: icon,
    [`button--icon-${iconPosition}`]: icon && iconPosition && children,
  })

  // Separate check to properly render disabled link-buttons
  const { disabled } = rest
  if (disabled) {
    return (
      <button className={classes} type="button" {...rest}>
        <span className="button__text">{children}</span>

        {icon && <Icon symbol={icon} />}
      </button>
    )
  }

  return (
    <ConditionalLink
      href={href}
      fallbackElement="button"
      className={classes}
      type="button"
      {...rest}
    >
      {children && <span className="button__text">{children}</span>}

      {icon && <Icon symbol={icon} />}
    </ConditionalLink>
  )
}

export default Button
export { default as buttonVariants } from './variants.js'
