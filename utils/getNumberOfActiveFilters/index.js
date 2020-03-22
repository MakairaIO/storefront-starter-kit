export default function getNumberOfActiveFilters({ aggregations = {} }) {
  return Object.values(aggregations).reduce((acc, aggregation) => {
    if (aggregation.selectedValues != null) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
}
