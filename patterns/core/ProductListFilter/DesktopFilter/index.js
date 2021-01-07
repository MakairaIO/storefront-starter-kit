import MultiSelectFilter from './MultiSelectFilter'
import MultiSelectFilterGrid from './MultiSelectFilterGrid'
import RangeFilter from './RangeFilter'
import FilterResetButton from '../../ProductList/FilterResetButton'
import { Heading } from '../../..'
import { useTranslation } from '../../../../utils'

const filterComponents = {
  list_multiselect: MultiSelectFilter,
  list_multiselect_custom_1: MultiSelectFilterGrid,
  list_multiselect_custom_2: MultiSelectFilter,
  range_slider: RangeFilter,
  range_slider_custom_1: RangeFilter,
  range_slider_custom_2: RangeFilter,
  range_slider_price: RangeFilter,
}

export default function DesktopFilter(props) {
  const { t } = useTranslation()
  const {
    aggregations = {},
    numberOfActiveFilters = 0,
    submitForms,
    resetAllFilters,
  } = props

  return (
    <form className="desktop-filter">
      {Object.values(aggregations).map((aggregation) => {
        const { key: id, type, title, min, max } = aggregation

        const Component = filterComponents[type]

        if (!Component) return null

        return (
          <div key={id} className="desktop-filter__section">
            <Heading size="bacchus" className="desktop-filter__filter-title">
              {t(`FILTER_LABEL_${id.toUpperCase()}`, title)}
            </Heading>

            <Component
              // Care: The order of properties matters here, since the aggregations
              // have a field 'key' which could override our custom-built key below
              // which we need for properly updating/reseting the RangeFilter
              {...aggregation}
              id={id}
              key={max ? `${id}-${min}-${max}` : id}
              submitForms={submitForms}
            />
          </div>
        )
      })}

      <FilterResetButton
        numberOfActiveFilters={numberOfActiveFilters}
        resetAllFilters={resetAllFilters}
      />
    </form>
  )
}
