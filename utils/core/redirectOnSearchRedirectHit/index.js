import { redirect } from '../..'

export default function redirectOnSearchRedirectHit({ ctx, searchResult }) {
  const { searchredirect = {} } = searchResult

  if (searchredirect.count > 0) {
    const { targetUrl = '' } = searchredirect.items[0].fields

    if (targetUrl) {
      redirect({ ctx, target: targetUrl, code: 302 })
    }
  }
}
