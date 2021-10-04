import { Button } from '..'
import { useTranslation } from '../../utils'

export default function FilterResetButton(props) {
  const { t } = useTranslation()
  const { numberOfActiveFilters = 0, resetAllFilters } = props

  if (numberOfActiveFilters == 0) return null

  return (
    <Button
      variant="tertiary"
      className="product-list__filter-reset-button"
      icon="ban"
      iconPosition="left"
      onClick={resetAllFilters}
    >
      {t('DESKTOP_FILTER_RESET_ALL')}
    </Button>
  )
}
