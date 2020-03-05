import classNames from 'classnames'
import { Icon } from '..'

function Button(props) {
  const {
    type = '',
    className = '',
    icon = '',
    iconPosition = 'right',
    href = '',
  } = props

  const classes = classNames('button', className, {
    [`button--${type}`]: type,
    [`button--icon-${iconPosition}`]: icon && iconPosition,
  })

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
