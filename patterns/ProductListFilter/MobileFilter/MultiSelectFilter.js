import { useState } from 'react'
import classNames from 'classnames'
import { Icon } from '../..'

export default function MultiSelectFilter(props) {
  const { id, values: filterValues, selectedValues } = props

  return (
    <ul>
      {Object.values(filterValues).map(filter => (
        <FilterEntry
          key={filter.key}
          id={id}
          filterValue={filter.key}
          selectedValues={selectedValues}
        />
      ))}
    </ul>
  )
}

function FilterEntry(props) {
  const { id, filterValue, selectedValues = [] } = props

  let isInitiallyActive = false

  if (Array.isArray(selectedValues)) {
    // lowercase values for normalization purposes
    isInitiallyActive = selectedValues
      .map(val => val.toLowerCase())
      .includes(filterValue.toLowerCase())
  }

  const [isActive, setActive] = useState(isInitiallyActive)

  const classes = classNames('mobile-filter__item', {
    ['mobile-filter__item--active']: isActive,
  })

  return (
    <li key={filterValue} className={classes}>
      <label>
        {filterValue}

        <input
          type="checkbox"
          name={id}
          className="sc-filter__input sc-filter__input--checkbox"
          checked={isActive}
          onChange={() => setActive(!isActive)}
        />
      </label>

      {isActive && <Icon symbol="check" />}
    </li>
  )
}
