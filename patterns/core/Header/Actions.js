import { useShopCart } from '@makaira/storefront-react'
import { useCallback, useEffect } from 'react'
import { Button, FormattedPrice } from '../..'
import { useTranslation } from '../../../utils'
import Cart from './Cart'
import LoginBox from './User/LoginBox'

// TODO: Remove hard-coded implementation
export default function Actions(props) {
  const { toggleLoginBox, isLoginBoxVisible, toggleCartBox, isCartBoxVisible } =
    props

  const { quantityInCart, totalPriceInCart } = useShopCart()
  const { t } = useTranslation()
  const hideLoginBox = useCallback(
    (event) => {
      if (isLoginBoxVisible && !event.target.closest(`.flyout-box`)) {
        toggleLoginBox()
      }
    },
    [isLoginBoxVisible, toggleLoginBox]
  )

  const hideCartBox = useCallback(
    (event) => {
      if (isCartBoxVisible && !event.target.closest(`.flyout-box`)) {
        toggleCartBox()
      }
    },
    [isCartBoxVisible, toggleCartBox]
  )

  useEffect(() => {
    if (isLoginBoxVisible) {
      window.addEventListener('click', hideLoginBox)

      return () => window.removeEventListener('click', hideLoginBox)
    }
    if (isCartBoxVisible) {
      window.addEventListener('click', hideCartBox)

      return () => window.removeEventListener('click', hideCartBox)
    }
  }, [isLoginBoxVisible, isCartBoxVisible, hideLoginBox, hideCartBox])

  return (
    <div className="header__actions">
      <div className="header__actions header__actions--mobile">
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

      {isCartBoxVisible && <Cart />}
    </div>
  )
}
