import { default as NextLink } from 'next/link'
import { getFullUrl } from '../../utils'

export default function Link(props) {
  const { href, children, ...rest } = props

  const fullUrl = new URL(getFullUrl(href))
  const pathname = fullUrl.pathname
  const search = fullUrl.search.replace(/^\?/, '')
  const hash = fullUrl.hash

  const internalHref = `/frontend/entry?seoUrl=${pathname}&${search}`
  const externalHref = pathname + (search !== '' ? `?${search}` : '') + hash

  return (
    <NextLink href={internalHref} as={externalHref}>
      <a {...rest}>{children}</a>
    </NextLink>
  )
}
