import { Link } from '../..'

export default function ConditionalLink(props) {
  const { href = '', fallbackElement = 'div', children, ...rest } = props

  if (href && href != '') {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (fallbackElement.toLowerCase() == 'fragment') {
    return <>{children}</>
  }

  const Element = fallbackElement

  return <Element {...rest}>{children}</Element>
}
