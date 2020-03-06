import classNames from 'classnames'

export default function Icon(props) {
  const { symbol, className } = props
  const classes = classNames('icon', `icon--${symbol}`, className)

  return (
    <span className={classes}>
      <svg role="img">
        <use xlinkHref={`#${symbol}`} />
      </svg>
    </span>
  )
}
