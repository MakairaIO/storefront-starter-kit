import Router from 'next/router'
import qs from 'qs'
import { collectBundleFormData, prepareSlotsForQueryString } from '../..'

export default async function submitBundleForm() {
  const bundleFormData = collectBundleFormData()
  const bundles = prepareSlotsForQueryString(bundleFormData)

  const queryString = qs.stringify(bundles)

  const seoUrl = Router.asPath
    .replace(/#.*$/, '') // remove hash/anchor
    .replace(/\?.*$/, '') // remove queryString

  await Router.push(
    `/frontend/entry?seoUrl=${seoUrl}&${queryString}`,
    `${seoUrl}?${queryString}`
  )
}
