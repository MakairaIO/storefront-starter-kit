import Router from 'next/router'
import qs from 'qs'
import {
  collectFilterFormData,
  collectSorterFormData,
  prepareFilterForQueryString,
  prepareSortingForQueryString,
} from '..'

export default async function submitProductListForms({ aggregations = {} }) {
  const filterFormData = collectFilterFormData()
  const makairaFilter = prepareFilterForQueryString(
    filterFormData,
    aggregations
  )

  const sorterFormData = collectSorterFormData()
  const { sortBy, order } = prepareSortingForQueryString(sorterFormData)

  const seoUrl = Router.asPath.replace(/\?.*$/, '') // remove queryString
  let parameters = {
    makairaFilter,
    sortBy,
    order,
    // count,
    // offset,
  }

  const queryString = qs.stringify(parameters)

  await Router.push(
    `/frontend/entry?seoUrl=${seoUrl}&${queryString}`,
    `${seoUrl}?${queryString}`
  )
}
