import MultiSelectFilter from './MultiSelectFilter'
import RangeFilter from '../MobileFilter/RangeFilter'
import { Heading } from '../..'
import { useTranslation } from '../../../utils'

const filterComponents = {
  list_multiselect: MultiSelectFilter,
  range_slider: RangeFilter,
}

export default function DesktopFilter(props) {
  const { t } = useTranslation()
  const { aggregations = {} } = props

  return (
    <div className="desktop-filter">
      {Object.values(aggregations).map(aggregation => {
        const { key, type } = aggregation

        console.log({ key, type })
        const Component = filterComponents[type]

        if (!Component) return null

        return (
          <div key={key} className="desktop-filter__section">
            <Heading size="125" className="desktop-filter__filter-title">
              {t(`FILTER_LABEL_${key.toUpperCase()}`)}
            </Heading>

            <Component {...aggregation} />
          </div>
        )
      })}
    </div>
  )
}
