import classNames from 'classnames'
import MultiSelectFilter from './MultiSelectFilter'
import RangeFilter from './RangeFilter'
import { useTranslation } from '../../../../utils'
import { Heading, Button } from '../../..'

const filterComponents = {
  list_multiselect: MultiSelectFilter,
  list_multiselect_custom_1: MultiSelectFilter,
  list_multiselect_custom_2: MultiSelectFilter,
  range_slider: RangeFilter,
  range_slider_custom_1: RangeFilter,
  range_slider_custom_2: RangeFilter,
  range_slider_price: RangeFilter,
}

export default function MobileFilterList(props) {
  const { t } = useTranslation()
  const { isVisible = false, id, title, type, submitForms, closeFilter } = props

  const Component = filterComponents[type]

  if (!Component) return null

  async function handleSave() {
    await submitForms()
    closeFilter()
  }

  const classes = classNames('mobile-filter__list', {
    'mobile-filter__list--visible': isVisible,
  })

  return (
    <div className={classes}>
      <Heading className="mobile-filter__list-header">
        {t(`FILTER_LABEL_${id.toUpperCase()}`, title)}
      </Heading>

      <Component {...props} />

      <div className="mobile-filter__list-footer">
        <Button
          variant="primary"
          icon="chevron-left"
          iconPosition="left"
          onClick={handleSave}
        >
          {t('MOBILE_FILTER_SAVE')}
        </Button>
      </div>
    </div>
  )
}
