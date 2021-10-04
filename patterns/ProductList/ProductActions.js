import { Button } from '..'
import { useTranslation, addToCart } from '../../utils'

export default function ProductActions(props) {
  const { t } = useTranslation()
  const { id } = props['makaira-product']

  return (
    <div className="product-item__actions">
      <Button variant="primary" onClick={() => addToCart(id)}>
        {t('PRODUCT_TILE_ADD_TO_CART')}
      </Button>
    </div>
  )
}
