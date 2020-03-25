import { useState } from 'react'
import classNames from 'classnames'
import ActiveFilters from './ActiveFilters'
import MobileFilterList from './MobileFilterList'
import { useTranslation } from '../../../utils'
import { Icon, Heading, Button } from '../..'

export default function MobileFilter(props) {
  const { t } = useTranslation()
  const [visibleFilter, setVisibleFilter] = useState(null)

  const {
    aggregations = {},
    totalProductCount = 0,
    numberOfActiveFilters = 0,
    isMobileFilterVisible = false,
    hideMobileFilter,
    submitForms,
    resetAllFilters,
  } = props

  const classes = classNames('mobile-filter', {
    'mobile-filter--visible': isMobileFilterVisible,
  })

  return (
    <form className={classes}>
      <div className="mobile-filter__header">
        <Heading>Filter</Heading>

        {numberOfActiveFilters > 0 && (
          <Button
            variant="link"
            icon="ban"
            iconPosition="left"
            onClick={resetAllFilters}
          >
            {t('MOBILE_FILTER_RESET_ALL')}
          </Button>
        )}
      </div>

      {Object.values(aggregations).map((aggregation) => {
        const { key, title } = aggregation

        return (
          <div key={key} className="mobile-filter__section">
            <button
              type="button"
              className="mobile-filter__button"
              onClick={() => setVisibleFilter(key)}
            >
              {t(`FILTER_LABEL_${key.toUpperCase()}`, title)}

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
              submitForms={submitForms}
            />
          </div>
        )
      })}

      <div className="mobile-filter__footer">
        <Button variant="primary" icon="check" onClick={hideMobileFilter}>
          {t('MOBILE_FILTER_CLOSE')(totalProductCount)}
        </Button>
      </div>
    </form>
  )
}
