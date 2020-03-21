import { Button } from '..'
import { useTranslation } from '../../utils'

export default function ProductActions() {
  const { t } = useTranslation()

  return (
    <div className="product-item__actions">
      <Button type="primary">{t('PRODUCT_TILE_ADD_TO_CART')}</Button>
    </div>
  )
}
