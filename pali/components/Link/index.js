import { default as NextLink } from 'next/link'

function getFullUrl(url) {
  let fullUrl

  if (url.includes('whitelabel-shop.preview.makaira.cloud')) {
    // here, we check for all subdomains at once
    fullUrl = url
  } else {
    const normalizedPath = url
      .replace(/\/\/+/g, '/') // replace double slashes
      .replace(/^\//, '') // replace leading slash from path

    // TODO: Replace with env-variable for Shop-URL
    fullUrl = 'https://whitelabel-shop.preview.makaira.cloud/' + normalizedPath
  }

  return fullUrl
}

export default function Link({ href, children }) {
  let isSearch = href.substring(0, 7) === '/search'
  if (isSearch) {
    return (
      <NextLink href={href} as={href}>
        {children}
      </NextLink>
    )
  } else {
    const fullUrl = new URL(getFullUrl(href))
    const pathname = fullUrl.pathname
    const search = fullUrl.search.replace(/^\?/, '')

    const internalHref = `/?seoUrl=${pathname}&${search}`
    const externalHref = pathname + (search !== '' ? `?${search}` : '')

    return (
      <NextLink href={internalHref} as={externalHref}>
        {children}
      </NextLink>
    )
  }
}
