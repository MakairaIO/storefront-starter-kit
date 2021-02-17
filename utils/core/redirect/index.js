import Router from 'next/router'
import allLanguages from '../../../config/allLanguages'
import { getFullUrl, stripQuery, stripSlashes } from '../..'

/**
 * Only redirects to the catch-all route for now.
 */
export default function redirect({ ctx = {}, target = '/', code = 301 }) {
  const { res } = ctx
  const { fullUrl, isExternalLink } = getFullUrl(target)

  if (res) {
    res.writeHead(code, { Location: fullUrl })
    res.end()
  } else {
    if (isExternalLink) {
      window.location.href = fullUrl
    } else {
      const urlInstance = new URL(fullUrl)
      const pathname = urlInstance.pathname
      const search = stripQuery(urlInstance.search)
      const hash = urlInstance.hash

      /**
       * Since we do not necessarily know what language we are in, we have to
       * compare the current path with every available language and its respective
       * search path
       */
      const isSearchLink = allLanguages.some(
        (lang) => stripSlashes(lang.searchRoute) == stripSlashes(pathname)
      )

      let internalRoute = '/frontend/entry'
      if (isSearchLink) {
        internalRoute = '/frontend/search'
      }

      Router.push(
        `${internalRoute}?seoUrl=${pathname}&${search}`,
        `${pathname}${search ? '?' + search : ''}${hash}`
      )
    }
  }
}
