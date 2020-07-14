import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Icon } from '../../..'

export default function MultiSelectFilter(props) {
  const { id, values: filterValues, selectedValues } = props

  return (
    <ul>
      {Object.values(filterValues).map((filter) => (
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

  const [isActive, setActive] = useState(false)

  function updateActiveState() {
    let updated = false

    if (Array.isArray(selectedValues)) {
      updated = selectedValues
        .map((val) => val.toLowerCase())
        .includes(filterValue.toLowerCase())
    }

    setActive(updated)
  }

  useEffect(updateActiveState, [selectedValues, filterValue])

  const classes = classNames('mobile-filter__item', {
    ['mobile-filter__item--active']: isActive,
  })

  return (
    <li className={classes}>
      <label>
        <Icon symbol={isActive ? 'check-circle' : 'circle'} />

        {filterValue}

        <input
          type="checkbox"
          name={id}
          checked={isActive}
          value={filterValue}
          onChange={() => setActive(!isActive)}
        />
      </label>
    </li>
  )
}
