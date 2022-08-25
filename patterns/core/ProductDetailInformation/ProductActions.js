import { useShopClient, useShopWishlist } from '@makaira/storefront-react'
import { useCallback, useState } from 'react'
import { Button, Dropdown } from '../..'
import {
  GTM,
  prepareTrackingItem,
  useAddToCart,
  useTranslation,
} from '../../../utils'

export default function ProductActions({
  bundles,
  addToBundle,
  productId,
  images,
  price,
  title,
  url,
  activeVariant,
}) {
  const [quantity, setQuantity] = useState(1)
  const [addToWishlistLoading, setAddToWishlistLoading] = useState(false)

  const { client } = useShopClient()
  const { addToCart, loading } = useAddToCart()
  const { isProductInWishlist } = useShopWishlist()

  const { t } = useTranslation()

  const quantities = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]

  const { data: isCurrentProductInWishlist } = isProductInWishlist(productId)

  const onAddToWishlist = useCallback(async () => {
    if (addToWishlistLoading) {
      return
    }

    setAddToWishlistLoading(true)

    if (isCurrentProductInWishlist) {
      await client.wishlist.removeItem({
        input: { product: { id: productId } },
      })
    } else {
      await client.wishlist.addItem({
        input: { product: { id: productId }, images, price, title, url },
      })

      GTM.trackEvent({
        event: 'add_to_wishlist',
        ecommerce: {
          items: [prepareTrackingItem(activeVariant)],
        },
        _clear: true,
      })
    }

    setAddToWishlistLoading(false)
  }, [
    isCurrentProductInWishlist,
    addToWishlistLoading,
    setAddToWishlistLoading,
    client.wishlist,
    activeVariant,
    productId,
    images,
    price,
    title,
    url,
  ])

  function onAddToCart(e) {
    e.stopPropagation()
    e.preventDefault()
    addToCart({ productId, title, images, price, url, quantity, activeVariant })
  }

  return (
    <div className="product-detail-information__actions">
      <Button
        icon="heart"
        iconPosition="left"
        variant={isCurrentProductInWishlist ? 'primary-alt' : 'secondary'}
        className="product-detail-information__wishlist"
        onClick={onAddToWishlist}
        loading={addToWishlistLoading}
      />

      <Dropdown
        id="sizeVariant"
        value={quantity}
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
