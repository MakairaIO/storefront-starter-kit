import { useState } from 'react'
import { Button, Dropdown } from '../..'
import { useAddToCart, useTranslation } from '../../../utils'

export default function ProductActions(props) {
  const { t } = useTranslation()
  const { addToCart, loading } = useAddToCart()

  const [quantitiy, setQuantity] = useState(1)
  const { bundles, addToBundle, productId } = props

  const quantities = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]

  function onAddToCart(e) {
    e.stopPropagation()
    e.preventDefault()
    addToCart({ productId, quantitiy })
  }

  return (
    <div className="product-detail-information__actions">
      <Button
        icon="heart"
        className="product-detail-information__wishlist"
        variant="icon-only"
      />

      <Dropdown
        id="sizeVariant"
        value={quantitiy}
        options={quantities}
        onChange={({ value }) => setQuantity(value)}
        className="product-detail-information__quantity-select"
      />

      <Button
        variant="primary-alt"
        icon="cart"
        iconPosition="left"
        className="product-detail-information__add-cart"
        loading={loading}
        disabled={loading}
        onClick={onAddToCart}
      >
        {t('PRODUCT_DETAIL_ADD_TO_CART')}
      </Button>

      {bundles && bundles.length ? (
        <Button
          variant="primary"
          className="product-detail-information__add-bundle"
          onClick={addToBundle}
        >
          {t('PRODUCT_DETAIL_ADD_TO_BUNDLE')}
        </Button>
      ) : null}
    </div>
  )
}
