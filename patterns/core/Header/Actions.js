import { useShopCart, useShopWishlist } from '@makaira/storefront-react'
import { Button, FormattedPrice } from '../..'
import { useTranslation } from '../../../utils'
import Cart from './Cart'
import LoginBox from './User/LoginBox'
import Wishlist from './Wishlist'

// TODO: Remove hard-coded implementation
export default function Actions(props) {
  const {
    toggleLoginBox,
    isLoginBoxVisible,
    toggleWishlistBox,
    isWishlistBoxVisible,
    toggleCartBox,
    isCartBoxVisible,
  } = props

  const { quantityInCart, totalPriceInCart } = useShopCart()
  const { wishlist } = useShopWishlist()
  const { t } = useTranslation()

  return (
    <div className="header__actions">
      <div className="header__actions header__actions--mobile">
        <Button
          variant="icon-only"
          icon="heart"
          className="header__action"
          onClick={toggleWishlistBox}
        />

        <Button
          variant="icon-only"
          icon="user"
          className="header__action"
          onClick={toggleLoginBox}
        />

        <Button
          variant="icon-only"
          icon="cart"
          onClick={toggleCartBox}
          className="header__action"
        />
      </div>

      <div className="header__actions header__actions--desktop">
        <Button
          icon="heart"
          onClick={toggleWishlistBox}
          iconPosition="left"
          variant={wishlist?.items.length > 0 ? 'primary-alt' : 'secondary'}
        >
          {wishlist?.items.length.toString()}
        </Button>

        <Button
          icon="user"
          className="header__action"
          iconPosition="left"
          onClick={toggleLoginBox}
        >
          {t('HEADER_ACCOUNT_AREA')}
        </Button>

        <Button
          icon="cart"
          onClick={toggleCartBox}
          className="header__action"
          iconPosition="left"
        >
          {quantityInCart > 0 && (
            <span className="header__basket-bubble">{quantityInCart}</span>
          )}

          <FormattedPrice price={totalPriceInCart} />
        </Button>
      </div>

      {isLoginBoxVisible && <LoginBox />}

      {isWishlistBoxVisible && <Wishlist />}

      {isCartBoxVisible && <Cart />}
    </div>
  )
}
