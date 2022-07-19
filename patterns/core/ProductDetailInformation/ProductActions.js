import { useShopClient } from '@makaira/storefront-react'
import { useState } from 'react'
import { Button, Dropdown } from '../..'
import { useTranslation } from '../../../utils'

export default function ProductActions({
  bundles,
  addToBundle,
  productId,
  images,
  price,
  title,
  url,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { client } = useShopClient()

  const { t } = useTranslation()

  const quantities = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]

  async function addToCart() {
    setIsLoading(true)

    client.cart
      .addItem({
        input: {
          quantity,
          product: { id: productId },
          images,
          price,
          title,
          url,
        },
      })
      .then((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="product-detail-information__actions">
      <Dropdown
        id="sizeVariant"
        options={quantities}
        value={quantity}
        onChange={({ value }) => setQuantity(value)}
        className="product-detail-information__quantity-select"
      />

      <Button
        variant="primary-alt"
        icon="cart"
        iconPosition="left"
        className="product-detail-information__add-cart"
        loading={isLoading}
        disabled={isLoading}
        onClick={addToCart}
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
