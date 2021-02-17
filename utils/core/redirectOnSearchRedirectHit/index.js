import { redirect } from '../..'

export default function redirectOnSearchRedirectHit({ ctx, searchResult }) {
  const searchRedirect = searchResult.searchredirect

  if (searchRedirect.count > 0) {
    const item = searchRedirect.items[0]
    const targetUrl = item.fields.targeturl

    redirect({ ctx, target: targetUrl, code: 302 })
  }
}
