import { Button } from '..'
import { useTranslation } from '../../utils'

export default function ProductActions() {
  const { t } = useTranslation()

  return (
    <div className="product-placement-item__actions">
      <Button variant="primary">{t('PRODUCT_TILE_ADD_TO_CART')}</Button>
    </div>
  )
}
