import qs from 'qs'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import find from 'lodash/find'
import set from 'lodash/set'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'

export default async function redirectToBundle({ product, params }) {
  const { redirectBundleId: bundleId } = params

  let { bundleParams, seoUrl } = bundleId
    ? prepareParamsWithBundleId({ bundleId, product })
    : prepareParamsWithoutBundleId({ product })

  const queryString = qs.stringify(bundleParams)

  await Router.push(
    `/frontend/entry?seoUrl=/${seoUrl}/&${queryString}`,
    `/${seoUrl}/?${queryString}`
  )
}

function prepareParamsWithBundleId({ bundleId, product }) {
  const productId = product.id
  const currentBundle = find(product.bundles, { id: +bundleId })
  const seoUrl = currentBundle.url.replace(/\//g, '') // remove slash

  let bundleCookies = getCookiesByValue('bundle')

  let bundleParams = bundleCookies[seoUrl] || { bundleId: currentBundle.id }
  bundleParams = set(bundleParams, ['slots', currentBundle.slot], productId)

  return { bundleParams, seoUrl }
}

function prepareParamsWithoutBundleId({ product }) {
  const productId = product.id
  const bundles = product.bundles || []
  const sortedBundles = sortBy(bundles, ['id'])
  const bundle = last(sortedBundles) || {}
  const seoUrl = bundle.url.replace(/\//g, '') // remove slash

  let bundleParams = {
    bundleId: bundle.id,
    slots: {
      [bundle.slot]: productId,
    },
  }

  let bundleCookies = getCookiesByValue('bundle')
  if (bundleCookies[seoUrl]) {
    bundleParams.slots = {
      ...bundleCookies[seoUrl].slots,
      ...bundleParams.slots,
    }
  }

  return { bundleParams, seoUrl }
}

function getCookiesByValue(key) {
  try {
    const cookies = parseCookies()

    if (cookies[key]) {
      return JSON.parse(cookies[key])
    }

    return {}
  } catch (e) {
    console.error(e.message)
    return {}
  }
}
