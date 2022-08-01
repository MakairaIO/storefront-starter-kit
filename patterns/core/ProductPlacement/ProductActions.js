import { Button } from '../..'
import { useAddToCart, useTranslation } from '../../../utils'

export default function ProductActions(props) {
  const { t } = useTranslation()
  const { addToCart, loading } = useAddToCart()

  function onAddToCart(e) {
    e.stopPropagation()
    e.preventDefault()
    addToCart({ ...props, quantitiy: 1 })
  }

  return (
    <div className="product-placement-item__actions">
      <Button
        variant="primary"
        loading={loading}
        disabled={loading}
        onClick={onAddToCart}
      >
        {t('PRODUCT_TILE_ADD_TO_CART')}
      </Button>
    </div>
  )
}
