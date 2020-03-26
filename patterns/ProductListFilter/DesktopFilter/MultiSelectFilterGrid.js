import classNames from 'classnames'

export default function MultiSelectFilterGrid(props) {
  const { id, values: filterValues, selectedValues, submitForms } = props

  return (
    <ul className="desktop-filter__multi-select--grid">
      {Object.values(filterValues).map((filter) => {
        const { key: filterValue } = filter

        let isActive = false

        if (Array.isArray(selectedValues)) {
          // lowercase values for normalization purposes
          isActive = selectedValues
            .map((val) => val.toLowerCase())
            .includes(filterValue.toLowerCase())
        }

        const classes = classNames('desktop-filter__multi-select-item--grid', {
          ['desktop-filter__multi-select-item--grid-2-col']:
            filterValue.length > 8,
          ['desktop-filter__multi-select-item--grid-3-col']:
            filterValue.length > 20,
          ['desktop-filter__multi-select-item--grid-active']: isActive,
        })

        return (
          <li key={filterValue} className={classes}>
            <label>
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
