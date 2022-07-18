import { useShopClient } from '@makaira/storefront-react'
import { Button } from '../..'
import { useTranslation } from '../../../utils'

export default function ProductActions({
  productId,
  images,
  price,
  title,
  url,
}) {
  const { client } = useShopClient()
  const { t } = useTranslation()

  function addToCart(e) {
    e.preventDefault()
    client.cart.addItem({
      input: {
        quantity: 1,
        product: { id: productId },
        images,
        price,
        title,
        url,
      },
    })
  }

  return (
    <div className="product-item__actions">
      <Button variant="primary" onClick={addToCart}>
        {t('PRODUCT_TILE_ADD_TO_CART')}
      </Button>
    </div>
  )
}
