import { Button, FormattedPrice } from '..'
import { useTranslation } from '../../utils'
import React, { useEffect, useState } from 'react'

// TODO: Remove hard-coded implementation
export default function Actions() {
  const { t } = useTranslation()
  const [cart, setCart] = useState({})

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')))
    window.addEventListener('storage', () => {
      setCart(JSON.parse(localStorage.getItem('cart')))
    })
  }, [])

  return (
    <>
      <div className="header__actions header__actions--mobile">
        <Button
          variant="icon-only"
          icon="user"
          href="#todo"
          className="header__action"
        />

        <Button
          variant="icon-only"
          icon="cart"
          href="#todo"
          className="header__action"
        />
      </div>

      <div className="header__actions header__actions--desktop">
        <Button
          icon="user"
          href="#todo"
          className="header__action"
          iconPosition="left"
        >
          {t('HEADER_ACCOUNT_AREA')}
        </Button>
        <Button
          icon="cart"
          href={`${process.env.FAILOVER_URL}/shop/cart`}
          className="header__action"
          iconPosition="left"
          isInternalRoute={true}
        >
          <span className="header__basket-bubble">
            {cart?.items?.length | 0}
          </span>

          <FormattedPrice price={cart?.totalIncVat | 0} />
        </Button>
      </div>
    </>
  )
}
