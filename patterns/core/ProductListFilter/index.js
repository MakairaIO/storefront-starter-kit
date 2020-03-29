import MobileFilter from './MobileFilter'
import DesktopFilter from './DesktopFilter'

function filterRangeSlider(input) {
  const [, aggregation] = input
  const { type, min, max } = aggregation

  if (type.includes('range_slider')) {
    if (min == max) {
      return false
    }
  }

  return true
}

function format(acc, current) {
  const [key, aggregation] = current

  acc[key] = aggregation

  return acc
}

export default function ProductListFilter(props) {
  const { aggregations = {}, ...rest } = props

  const aggregationsToRender = Object.entries(aggregations)
    .filter(filterRangeSlider)
    .reduce(format, {})

  return (
    <>
      <MobileFilter aggregations={aggregationsToRender} {...rest} />
      <DesktopFilter aggregations={aggregationsToRender} {...rest} />
    </>
  )
}
