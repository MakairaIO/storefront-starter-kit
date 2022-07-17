import { Text, Button } from '../../../index'
import ProductList from '../AutoSuggestion/ProductList'
import { useShopCart, useShopClient } from '@makaira/storefront-react'
import FlyoutBox from '../FlyoutBox'
import { useTranslation } from '../../../../utils'
const Cart = () => {
  const { t } = useTranslation()
  const { cart } = useShopCart()
  const { client } = useShopClient()

  const products = cart.items.map(({ product }) => ({
    id: product.id,
    fields: {
      url: product.url,
      picture_url_main: product.images[0],
      images: product.images,
      title: product.title,
      id: product.id,
    },
  }))

  const handleRemoveClick = (id) => {
    client.cart.removeItem({ input: { product: { id } } })
  }

  return (
    <FlyoutBox>
      <Text className="cart-box__title" element="p" size="cupid">
        {t('CART')}
      </Text>

      {products.length === 0 ? (
        <Text className="cart-box__no-products" size="bacchus" element="p">
          {t('CART_EMPTY')}
        </Text>
      ) : (
        <>
          <ProductList
            onRemoveClick={handleRemoveClick}
            hideHeading
            showRemoveButton
            products={products}
          />

          <Button
            type="submit"
            variant="primary"
            className="cart-box__button"
            iconPosition="left"
            href="#todo"
          >
            {t('CART_TO_FULL_OVERVIEW')}
          </Button>
        </>
      )}
    </FlyoutBox>
  )
}

export default Cart
