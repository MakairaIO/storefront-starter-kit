import { Icon } from '..'

export default function Button(props) {
  const {
    order = '1st',
    size = '125',
    icon,
    iconPosition,
    isLoading,
    className,
    disabled = false,
    ...rest
  } = props

  const iconClasses = icon && iconPosition ? `icon--${iconPosition}` : ''
  const loadingClasses = isLoading ? 'button--loading' : ''
  const buttonClasses = `button button--${order} button--${size} ${iconClasses} ${loadingClasses} ${className}`

  return (
    <button disabled={disabled} className={buttonClasses} {...rest}>
      {icon && <Icon symbol={icon} />}

      {props.children}
    </button>
  )
}
