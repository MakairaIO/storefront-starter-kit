import classNames from 'classnames'
import { Icon } from '../../..'

export default function MultiSelectFilter(props) {
  const { id, values: filterValues, selectedValues, submitForms } = props

  return (
    <ul className="desktop-filter__multi-select">
      {Object.values(filterValues).map((filter) => {
        const { key: filterValue } = filter

        let isActive = false

        if (Array.isArray(selectedValues)) {
          // lowercase values for normalization purposes
          isActive = selectedValues
            .map((val) => val.toLowerCase())
            .includes(filterValue.toLowerCase())
        }

        const classes = classNames(
          'desktop-filter__multi-select-item--default',
          {
            ['desktop-filter__multi-select-item--active']: isActive,
          }
        )

        return (
          <li key={filterValue} className={classes}>
            <label>
              <Icon symbol={isActive ? 'check-circle' : 'circle'} />

              {filterValue}

              <input
                type="checkbox"
                name={id}
                checked={isActive}
                value={filterValue}
                onChange={submitForms}
              />
            </label>
          </li>
        )
      })}
    </ul>
  )
}
