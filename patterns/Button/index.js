import classNames from 'classnames'
import { Icon, Link } from '..'

function InnerButton(props) {
  const { icon, children } = props

  return (
    <>
      <span className="button__text">{children}</span>

      {icon && <Icon symbol={icon} />}
    </>
  )
}

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
      <Link href={href} className={classes} {...rest}>
        <InnerButton {...props} />
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      <InnerButton {...props} />
    </button>
  )
}

export default Button
export { default as buttonVariants } from './variants.js'
