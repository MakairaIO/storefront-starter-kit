import Router from 'next/router'
import qs from 'qs'

export default async function resetAllProductListFilters({
  isSearch = false,
  isBundle = false,
}) {
  const seoUrl = Router.asPath.replace(/\?.*$/, '') // remove queryString

  let parameters = {}
  let internalRoute = '/frontend/entry'
  if (isSearch) {
    let { searchPhrase } = qs.parse(Router.query)

    internalRoute = '/frontend/search'
    parameters.searchPhrase = searchPhrase
  }

  if (isBundle) {
    let { slots, bundleId, currentSlot } = qs.parse(Router.query)
    parameters = {
      ...parameters,
      slots,
      bundleId,
      currentSlot,
    }
  }

  const queryString = qs.stringify(parameters)

  await Router.push(
    `${internalRoute}?seoUrl=${seoUrl}&${queryString}`,
    `${seoUrl}${queryString ? '?' + queryString : ''}`
  )
}
