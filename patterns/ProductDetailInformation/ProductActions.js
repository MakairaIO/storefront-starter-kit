import { Button, Dropdown } from '..'
import { useTranslation, addToCart } from '../../utils'
import { useState } from 'react'

// TODO: Add functionality (add-to-wishlist, add-to-cart etc.)
export default function ProductActions(props) {
  const { id } = props['makaira-product']
  const { t } = useTranslation()
  const [quantity, setQuantity] = useState(1)

  const quantities = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]

  return (
    <div className="product-detail-information__actions">
      <Button
        icon="heart"
        className="product-detail-information__wishlist"
        variant="icon-only"
      />

      <Dropdown
        id="sizeVariant"
        options={quantities}
        onChange={({ value }) => setQuantity(value)}
        className="product-detail-information__quantity-select"
        value={quantity}
      />

      <Button
        variant="primary-alt"
        icon="cart"
        iconPosition="left"
        onClick={() => addToCart(id, quantity)}
      >
        {t('PRODUCT_DETAIL_ADD_TO_CART')}
      </Button>
    </div>
  )
}
