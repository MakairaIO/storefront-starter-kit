import classNames from 'classnames'

export default function MultiSelectFilter(props) {
  const { id, values: filterValues, selectedValues } = props

  return (
    <ul className="desktop-filter__multi-select">
      {Object.values(filterValues).map(filter => {
        const { key: filterValue } = filter

        let isActive = false

        if (Array.isArray(selectedValues)) {
          // lowercase values for normalization purposes
          isActive = selectedValues
            .map(val => val.toLowerCase())
            .includes(filterValue.toLowerCase())
        }

        const classes = classNames('desktop-filter__item', {
          ['desktop-filter__item--2-col']: filterValue.length > 8,
          ['desktop-filter__item--3-col']: filterValue.length > 20,
          ['desktop-filter__item--active']: isActive,
        })

        return (
          <li key={filterValue} className={classes}>
            <label>
              {filterValue}

              <input
                type="checkbox"
                name={id}
                checked={isActive}
                // TODO
                // onChange={() => setActive(!isActive)}
              />
            </label>
          </li>
        )
      })}
    </ul>
  )
}
