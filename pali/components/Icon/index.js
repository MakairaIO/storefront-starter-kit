export default function Icon({ symbol, ...rest }) {
  return (
    <span className={`icon icon__${symbol}`} {...rest}>
      <svg role="img">
        <use xlinkHref={`#${symbol}`} />
      </svg>
    </span>
  )
}
