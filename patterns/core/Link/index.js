import { default as NextLink } from 'next/link'
import allLanguages from '../../../config/allLanguages'
import {
  isMailToLink,
  getFullUrl,
  stripQuery,
  stripSlashes,
  useTranslation,
} from '../../../utils'

/**
 * We have 4 different use-cases for handling links:
 * 1) A link to another internal route. These are mostly project-specific (like rendering the user's cart)
 * 2) Links to external pages
 * 3) Links to a search page
 * 4) The most common: Links to other pages that get served by the main catch-all route
 */
export default function Link(props) {
  const { language } = useTranslation()
  const { href, children, isInternalRoute, ...rest } = props

  /**
   * Internal Routes
   */
  if (isInternalRoute) {
    const { as, ...htmlAttributes } = rest

    return (
      <NextLink href={href} as={as} legacyBehavior>
        <a {...htmlAttributes}>{children}</a>
      </NextLink>
    )
  }

  if (isMailToLink(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
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
   * Determine search vs. catch-all
   */
  const urlInstance = new URL(fullUrl)
  const pathname = urlInstance.pathname
  const search = stripQuery(urlInstance.search)
  const hash = urlInstance.hash

  const externalHref = pathname + (search !== '' ? `?${search}` : '') + hash

  const languageConfig = allLanguages.find((lang) => lang.value === language)
  const isSearchLink =
    stripSlashes(pathname) == stripSlashes(languageConfig.searchRoute) // compare normalized values

  /**
   * Pages served by search route
   */
  if (isSearchLink) {
    const internalHref = `/frontend/search?${search}`

    return (
      <NextLink href={internalHref} as={externalHref} legacyBehavior>
        <a {...rest}>{children}</a>
      </NextLink>
    )
  }

  /**
   * Pages served by catch-all route
   */
  const internalHref = `/frontend/entry?seoUrl=${pathname}&${search}`

  return (
    <NextLink href={internalHref} as={externalHref} legacyBehavior>
      <a {...rest}>{children}</a>
    </NextLink>
  )
}
