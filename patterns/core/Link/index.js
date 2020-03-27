import { default as NextLink } from 'next/link'
import { getFullUrl } from '../../../utils'

export default function Link(props) {
  const { href, children, ...rest } = props

  const { fullUrl, isExternalLink } = getFullUrl(href)

  if (isExternalLink) {
    // For information about why to add `rel="noopener noreferrer"`, see: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/`
    return (
      <a href={fullUrl} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  } else {
    const urlInstance = new URL(fullUrl)
    const pathname = urlInstance.pathname
    const search = urlInstance.search.replace(/^\?/, '')
    const hash = urlInstance.hash

    const internalHref = `/frontend/entry?seoUrl=${pathname}&${search}`
    const externalHref = pathname + (search !== '' ? `?${search}` : '') + hash

    return (
      <NextLink href={internalHref} as={externalHref}>
        <a {...rest}>{children}</a>
      </NextLink>
    )
  }
}
