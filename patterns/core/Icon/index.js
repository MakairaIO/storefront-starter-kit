import classNames from 'classnames'

export default function Icon(props) {
  const { symbol, className, ...restProps } = props
  const classes = classNames(className, 'icon', `icon--${symbol}`)

  return (
    <span className={classes} {...restProps}>
      <svg role="img">
        <use xlinkHref={`#${symbol}`} />
      </svg>
    </span>
  )
}
