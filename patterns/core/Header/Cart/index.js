import { Text, Button } from '../../../index'
import ProductList from './ProductList'
import { useShopCart } from '@makaira/storefront-react'
import FlyoutBox from '../FlyoutBox'
import { useTranslation } from '../../../../utils'
const Cart = () => {
  const { t } = useTranslation()
  const { cart } = useShopCart()

  return (
    <FlyoutBox>
      <Text className="cart-box__title" element="p" size="cupid">
        {t('CART')}
      </Text>

      {cart.items.length === 0 ? (
        <Text className="cart-box__no-products" size="bacchus" element="p">
          {t('CART_EMPTY')}
        </Text>
      ) : (
        <>
          <ProductList products={cart.items} />

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
