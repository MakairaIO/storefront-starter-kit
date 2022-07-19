import { useShopCart } from '@makaira/storefront-react'
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
