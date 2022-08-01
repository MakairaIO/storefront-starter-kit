import { useShopCart, useShopWishlist } from '@makaira/storefront-react'
import { useCallback, useEffect } from 'react'
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

  useEffect(() => {
    if (isLoginBoxVisible) {
      window.addEventListener('click', hideLoginBox)

      return () => window.removeEventListener('click', hideLoginBox)
    }
    if (isWishlistBoxVisible) {
      window.addEventListener('click', hideWishlistBox)

      return () => window.removeEventListener('click', hideWishlistBox)
    }
    if (isCartBoxVisible) {
      window.addEventListener('click', hideCartBox)

      return () => window.removeEventListener('click', hideCartBox)
    }
  }, [
    isLoginBoxVisible,
    isWishlistBoxVisible,
    isCartBoxVisible,
    hideLoginBox,
    hideWishlistBox,
    hideCartBox,
  ])

  const hideLoginBox = useCallback(
    (event) => {
      if (isLoginBoxVisible && !event.target.closest(`.flyout-box`)) {
        toggleLoginBox()
      }
    },
    [isLoginBoxVisible, toggleLoginBox]
  )

  const hideWishlistBox = useCallback(
    (event) => {
      if (isWishlistBoxVisible && !event.target.closest(`.flyout-box`)) {
        toggleWishlistBox()
      }
    },
    [isWishlistBoxVisible, toggleWishlistBox]
  )

  const hideCartBox = useCallback(
    (event) => {
      if (isCartBoxVisible && !event.target.closest(`.flyout-box`)) {
        toggleCartBox()
      }
    },
    [isCartBoxVisible, toggleCartBox]
  )

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
