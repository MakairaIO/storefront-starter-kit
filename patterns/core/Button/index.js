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
    loading = false,
    ...rest
  } = props

  const classes = classNames(className, 'button', {
    [`button--${variant}`]: variant,
    [`button--icon`]: icon,
    [`button--icon-${iconPosition}`]: icon && iconPosition && children,
    ['button--loading']: loading,
  })

  // Separate check to properly render disabled link-buttons
  const { disabled } = rest
  if (disabled || loading) {
    return (
      <button className={classes} type="button" disabled={disabled}>
        <span className="button__text">{children}</span>

        {icon && !loading && <Icon symbol={icon} />}
        {loading && <Icon symbol="spinner" />}
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

      {icon && !loading && <Icon symbol={icon} />}
      {loading && <Icon symbol="spinner" />}
    </ConditionalLink>
  )
}

export default Button
export { default as buttonVariants } from './variants.js'
