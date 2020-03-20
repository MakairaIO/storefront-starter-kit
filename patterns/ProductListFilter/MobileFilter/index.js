import { useState } from 'react'
import classNames from 'classnames'
import MobileFilterList from './MobileFilterList'

export default function MobileFilter(props) {
  const [visibleFilter, setVisibleFilter] = useState(null)

  const {
    isMobileFilterVisible = false,
    aggregations = {},
    closeMobileFilter,
  } = props

  const classes = classNames('mobile-filter', {
    'mobile-filter--visible': isMobileFilterVisible,
  })

  return (
    <div className={classes}>
      <div className="mobile-filter__header">
        <span>Filter</span>
      </div>

      {Object.values(aggregations).map(aggregation => {
        const { key } = aggregation

        return (
          <div key={key} className="mobile-filter__section">
            <button
              type="button"
              className="mobile-filter__button"
              onClick={() => setVisibleFilter(key)}
            >
              {key}
            </button>

            <MobileFilterList
              id={key}
              {...aggregation}
              isVisible={visibleFilter == key}
              closeFilter={() => setVisibleFilter(null)}
            />
          </div>
        )
      })}

      <div className="mobile-filter__footer">
        <button type="button" onClick={closeMobileFilter}>
          Close
        </button>
      </div>
    </div>
  )
}
