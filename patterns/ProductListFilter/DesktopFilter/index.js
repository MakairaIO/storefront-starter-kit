import MultiSelectFilter from './MultiSelectFilter'
import RangeFilter from './RangeFilter'
import { Heading } from '../..'
import { useTranslation } from '../../../utils'

const filterComponents = {
  list_multiselect: MultiSelectFilter,
  range_slider: RangeFilter,
}

export default function DesktopFilter(props) {
  const { t } = useTranslation()
  const { aggregations = {}, submitForms } = props

  return (
    <form className="desktop-filter">
      {Object.values(aggregations).map(aggregation => {
        const { key, type, title, min, max } = aggregation

        const Component = filterComponents[type]

        if (!Component) return null

        return (
          <div key={key} className="desktop-filter__section">
            <Heading size="125" className="desktop-filter__filter-title">
              {t(`FILTER_LABEL_${key.toUpperCase()}`, title)}
            </Heading>

            <Component
              // Care: The order of properties matters here, since the aggregations
              // have a field 'key' which could override our custom-built key below
              // which we need for properly updating/reseting the RangeFilter
              {...aggregation}
              id={key}
              key={max ? `${key}-${min}-${max}` : key}
              submitForms={submitForms}
            />
          </div>
        )
      })}
    </form>
  )
}
