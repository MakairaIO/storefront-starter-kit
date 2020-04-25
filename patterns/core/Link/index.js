import { default as NextLink } from 'next/link'
import { getFullUrl } from '../../../utils'

/**
 * We have 3 different use-cases for handling links:
 * 1) A link to another internal route. These are mostly project-specific (like rendering the user's cart)
 * 2) Links to external pages
 * 3) The most common: Links to other pages that get served by the main catch-all route
 */
export default function Link(props) {
  const { href, children, isInternalRoute, ...rest } = props

  /**
   * Internal Routes
   */
  if (isInternalRoute) {
    const { as } = rest

    return (
      <NextLink href={href} as={as}>
        <a {...rest}>{children}</a>
      </NextLink>
    )
  }

  const { fullUrl, isExternalLink } = getFullUrl(href)

  /**
   * External Pages
   */
  if (isExternalLink) {
    // For information about why to add `rel="noopener noreferrer"`, see: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/`
    return (
      <a href={fullUrl} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  /**
   * Pages served by catch-all route
   */
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
