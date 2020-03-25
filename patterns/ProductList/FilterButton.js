import classNames from 'classnames'
import { Button } from '..'

export default function FilterButton(props) {
  const { numberOfActiveFilters = 0, showMobileFilter } = props

  const classes = classNames('product-list__filter-button', {
    ['product-list__filter-button--active']: numberOfActiveFilters > 0,
  })

  return (
    <Button className={classes} icon="chevron-down" onClick={showMobileFilter}>
      Filter
      <ActiveFilterHint numberOfActiveFilters={numberOfActiveFilters} />
    </Button>
  )
}

function ActiveFilterHint(props) {
  const { numberOfActiveFilters } = props

  if (!Number.isInteger(numberOfActiveFilters)) return null

  if (numberOfActiveFilters == 0) return null

  return (
    <span className="product-list__active-filter-hint">
      {numberOfActiveFilters}
    </span>
  )
}
