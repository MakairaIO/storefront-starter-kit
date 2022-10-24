import { Button } from '../..'
import { useAddToCart, useTranslation } from '../../../utils'

export default function ProductActions({
  productId,
  images,
  price,
  title,
  url,
  ean,
}) {
  const { t } = useTranslation()
  const { addToCart, loading } = useAddToCart()

  function onAddToCart(e) {
    e.stopPropagation()
    e.preventDefault()
    addToCart({
      productId,
      images,
      price,
      title,
      url,
      quantity: 1,
      ean,
    })
  }

  return (
    <div className="product-item__actions">
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
