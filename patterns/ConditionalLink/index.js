import { Link } from '..'

export default function ConditionalLink(props) {
  const { href = '', fallbackElement = 'div', children, ...rest } = props

  if (href != '') {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  const Element = fallbackElement

  return <Element {...rest}>{children}</Element>
}
