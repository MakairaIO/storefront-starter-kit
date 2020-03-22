import Router from 'next/router'
import qs from 'qs'
import {
  collectFilterFormData,
  collectSorterFormData,
  collectPaginationFormData,
  prepareFilterForQueryString,
  prepareSortingForQueryString,
  preparePaginationForQueryString,
} from '..'

export default async function submitProductListForms({ aggregations = {} }) {
  const count = process.env.PRODUCTS_PER_PAGE

  const filterFormData = collectFilterFormData()
  const makairaFilter = prepareFilterForQueryString(
    filterFormData,
    aggregations
  )

  const sorterFormData = collectSorterFormData()
  const { sortBy, order } = prepareSortingForQueryString(sorterFormData)

  const paginationFormData = collectPaginationFormData()
  const { offset } = preparePaginationForQueryString(paginationFormData, count)

  const seoUrl = Router.asPath.replace(/\?.*$/, '') // remove queryString
  let parameters = {
    makairaFilter,
    sortBy,
    order,
    count,
    offset,
  }

  const queryString = qs.stringify(parameters)

  await Router.push(
    `/frontend/entry?seoUrl=${seoUrl}&${queryString}`,
    `${seoUrl}?${queryString}`
  )
}
