import { Button } from '../..'
import { useAddToCart, useTranslation } from '../../../utils'

export default function ProductActions({
  ['makaira-product']: makairaProduct,
}) {
  const { t } = useTranslation()
  const { addToCart, loading } = useAddToCart()

  function onAddToCart(e) {
    e.stopPropagation()
    e.preventDefault()
    addToCart({
      productId: Array.isArray(makairaProduct)
        ? makairaProduct[0]?.id
        : makairaProduct?.id,
      quantity: 1,
    })
  }

  return (
    <div className="stream-placement-item__actions">
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
