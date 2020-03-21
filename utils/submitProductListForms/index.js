import Router from 'next/router'
import qs from 'qs'
import { collectFilterFormData, prepareFilterForQueryString } from '..'

export default function submitProductListForms({ aggregations = {} }) {
  const filterFormData = collectFilterFormData()
  const makairaFilter = prepareFilterForQueryString(
    filterFormData,
    aggregations
  )

  const seoUrl = Router.asPath.replace(/\?.*$/, '') // remove queryString
  let parameters = {
    makairaFilter,
    // sortBy,
    // order,
    // count,
    // offset,
  }

  const queryString = qs.stringify(parameters)

  Router.push(
    `/frontend/entry?seoUrl=${seoUrl}&${queryString}`,
    `${seoUrl}?${queryString}`
  )
}
