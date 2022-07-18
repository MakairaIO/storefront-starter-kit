import { redirect, getNumberOfActiveFilters } from '../..'

export default function redirectToDetailPageOnSingleHit({ ctx, searchResult }) {
  const { product = {} } = searchResult
  const { aggregations = {} } = product

  const hasActiveAggregations = getNumberOfActiveFilters({ aggregations }) > 0

  if (product.count == 1 && !hasActiveAggregations) {
    const item = product.items[0]
    const { url } = item.fields

    if (Array.isArray(url)) {
      redirect({ ctx, target: url[0], code: 302 })
    } else {
      redirect({ ctx, target: url, code: 302 })
    }
  }
}
