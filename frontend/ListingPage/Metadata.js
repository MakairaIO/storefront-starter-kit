import Head from 'next/head'
import { useGlobalData, getNumberOfActiveFilters } from '../../utils'

export default function Metadata() {
  const { pageData, params = {} } = useGlobalData()
  const { type } = pageData

  const aggregations = pageData.data.product.aggregations

  const title = getPageTitle({ type, page: pageData.data.self })
  const robotsContent = getRobotsContent({ aggregations, queryParams: params })

  return (
    <Head>
      {title && <title>{title}</title>}

      <meta key="ROBOTS" name="ROBOTS" content={robotsContent} />
    </Head>
  )
}

function getPageTitle({ type, page }) {
  let title = ''

  if (type === 'category') {
    const { category_title } = page

    title = category_title
  } else {
    // manufacturer
    const { manufacturer_title } = page

    title = manufacturer_title
  }

  return title
}

function getRobotsContent({ aggregations = {}, queryParams = {} }) {
  // const { count = 50, offset = 0, makairaFilter: activeFilters } = params
  const count = queryParams.count ?? process.env.PRODUCTS_PER_PAGE
  const offset = queryParams.offset ?? 0

  const currentPageNr = offset / count + 1
  const isFirstPage = currentPageNr === 1

  const hasActiveSorting = !!queryParams.sortBy

  const activeFilters = getNumberOfActiveFilters({ aggregations })

  // do not index when filter, pagintion or sorting is active
  const isIndexable = isFirstPage && activeFilters == 0 && !hasActiveSorting

  let robotsContent = ['FOLLOW']
  if (isIndexable) {
    robotsContent.push('INDEX')
  } else {
    robotsContent.push('NOINDEX')
  }

  return robotsContent.join(', ')
}
