import { Icon } from '..'

function Button(props) {
  const { type = '', className = '', icon = '', iconPosition = 'right' } = props

  const typeClasses = type != '' ? 'button--' + type : ''
  const iconClasses = icon && iconPosition ? 'button--icon-' + iconPosition : ''

  const classes = `button ${typeClasses} ${iconClasses} ${className}`

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <button type="button" className={classes}>
        <span
          className="button__text"
          style={{ display: 'block', maxWidth: 120 }}
        >
          {props.children} {props.children}
        </span>

        {icon && <Icon symbol={icon} />}
      </button>

      <button type="button" className={classes}>
        <span className="button__text">{props.children}</span>

        {icon && <Icon symbol={icon} />}
      </button>
    </div>
  )
}

export default Button
export { default as buttonVariants } from './variants.js'
