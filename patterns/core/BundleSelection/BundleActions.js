import { Button } from '../..'
import { useTranslation } from '../../../utils'

export default function BundleActions() {
  const { t } = useTranslation()

  return (
    <div className="bundle-list__actions">
      <Button variant="primary-alt" icon="cart" iconPosition="left">
        {t('PRODUCT_DETAIL_ADD_TO_CART')}
      </Button>
    </div>
  )
}
