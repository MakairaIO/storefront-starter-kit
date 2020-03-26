/**
 * Prepare filter values for query-string
 *  1) For Range-Slider we need to provide values directly
 *  2) For Multi-Selects we need to provide values as an array
 *
 * @param {FormData} formData FormData object containing the filter values
 * @param aggregations
 * @returns {Object} Key-Value-Object containing the selected filter values
 */
export default function prepareFilterForQueryString(formData, aggregations) {
  const filter = Array.from(formData).reduce((filterObject, current) => {
    const [key, value] = current

    if (key.includes('_to') || key.includes('_from')) {
      const aggregationId = key.split('_')[0]

      // We have to round here, because we round in RangeFilter as well
      const normalizedMin = Math.trunc(
        Number(aggregations[aggregationId]['min'])
      )
      const normalizedMax = Math.trunc(
        Number(aggregations[aggregationId]['max'])
      )

      // Do not add the value if it is the min/max
      if (Number(value) === normalizedMin || Number(value) === normalizedMax) {
        return filterObject
      }
      filterObject[key] = value
    } else {
      if (!filterObject[key]) {
        filterObject[key] = []
      }
      filterObject[key].push(value)
    }

    return filterObject
  }, {})

  return filter
}
