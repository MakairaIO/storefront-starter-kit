import { getNumberOfActiveFilters, useGlobalData } from '../../../utils'
import { Breadcrumb, ContentElements } from '../../../patterns'
import Metadata from '../Metadata'
import ProductList from './ProductListWithProps'

export default function ListingPage() {
  const { pageData, params = {} } = useGlobalData()

  const { type } = pageData

  const aggregations = pageData.data.product.aggregations

  const title = getPageTitle({ type, page: pageData.data.self })
  const { robotFollow, robotIndex } = getRobotsContent({
    aggregations,
    queryParams: params,
  })

  return (
    <main>
      <Metadata
        title={title}
        robotFollow={robotFollow}
        robotIndex={robotIndex}
      />

      <Breadcrumb breadcrumb={pageData.data.self.navigation?.breadcrumb} />
      <ContentElements
        elements={pageData.data.self.contentElements?.top?.elements}
      />
      <ProductList />
      <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      />
    </main>
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
  const count = queryParams.count ?? process.env.PRODUCTS_PER_PAGE
  const offset = queryParams.offset ?? 0

  const currentPageNr = offset / count + 1
  const isFirstPage = currentPageNr === 1

  const hasActiveSorting = !!queryParams.sortBy

  const activeFilters = getNumberOfActiveFilters({ aggregations })

  // do not index when filter, pagintion or sorting is active
  const isIndexable = isFirstPage && activeFilters == 0 && !hasActiveSorting

  return {
    robotFollow: 'follow',
    robotIndex: isIndexable ? 'index' : 'noindex',
  }
}
