import { useState } from 'react'
import classNames from 'classnames'
import ActiveFilters from './ActiveFilters'
import MobileFilterList from './MobileFilterList'
import { useTranslation } from '../../../utils'
import { Icon } from '../..'

export default function MobileFilter(props) {
  const { t } = useTranslation()
  const [visibleFilter, setVisibleFilter] = useState(null)

  const {
    isMobileFilterVisible = false,
    aggregations = {},
    hideMobileFilter,
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
              {t(`FILTER_LABEL_${key.toUpperCase()}`)}

              <ActiveFilters {...aggregation} />

              <Icon
                symbol="chevron-right"
                className="mobile-filter__button-chevron"
              />
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
        <button type="button" onClick={hideMobileFilter}>
          {t('MOBILE_FILTER_CLOSE')}
        </button>
      </div>
    </div>
  )
}
