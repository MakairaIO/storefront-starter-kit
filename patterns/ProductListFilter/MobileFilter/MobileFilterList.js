import MultiSelectFilter from './MultiSelectFilter'
import RangeFilter from './RangeFilter'
import { useTranslation } from '../../../utils'

const filterComponents = {
  list_multiselect: MultiSelectFilter,
  range_slider: RangeFilter,
}

export default function MobileFilterList(props) {
  const { t } = useTranslation()
  const { isVisible = false, id, type, closeFilter } = props

  if (!isVisible) return null

  const Component = filterComponents[type]

  if (!Component) return null

  return (
    <div className="mobile-filter__list">
      <div className="mobile-filter__list-header">
        <span>{id}</span>

        <button type="button" onClick={closeFilter}>
          {t('MOBILE_FILTER_BACK')}
        </button>
      </div>

      <div className="mobile-filter__list-values">
        <Component {...props} />
      </div>

      <div className="mobile-filter__list-footer">
        <button type="button" onClick={closeFilter}>
          {t('MOBILE_FILTER_SAVE')}
        </button>
      </div>
    </div>
  )
}
