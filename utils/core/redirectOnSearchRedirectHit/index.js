import { redirect } from '../..'

export default function redirectOnSearchRedirectHit({ ctx, searchResult }) {
  const { searchredirect = {} } = searchResult

  if (searchredirect.count > 0) {
    const item = searchredirect.items[0]
    const targetUrl = item.fields.targeturl

    redirect({ ctx, target: targetUrl, code: 302 })
  }
}
