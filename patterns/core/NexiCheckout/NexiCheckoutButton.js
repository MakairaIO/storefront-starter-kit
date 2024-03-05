import { useState } from 'react'
import { Text, Button, Heading } from '../..'
import { useTranslation } from '../../../utils'
import allLanguages from '../../../config/allLanguages'

const CHECKOUT_STATES = Object.freeze({
  READY: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
})

export function NexiCheckoutButton(props) {
  const [checkoutState, setCheckoutState] = useState(CHECKOUT_STATES.READY)
  const { t, language } = useTranslation()
  async function initNexiCheckout() {
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        body: JSON.stringify({
          ...props,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if ('errors' in data) {
        throw new Error(JSON.stringify(data.errors, null, 2))
      }

      const lang = allLanguages.find((lang) => lang.value === language)

      const checkoutOptions = {
        checkoutKey: process.env.NEXI_PUBLIC_KEY,
        paymentId: data.paymentId,
        containerId: 'checkout-container',
        language: lang.locale,
      }

      setCheckoutState(CHECKOUT_STATES.IN_PROGRESS)

      // this is the global object that is provided by the nexi sdk
      // eslint-disable-next-line no-undef
      const checkout = new Dibs.Checkout(checkoutOptions)
      checkout.on('payment-completed', () => {
        console.log('payment completed')
        setCheckoutState(CHECKOUT_STATES.COMPLETED)
      })
    } catch (e) {
      // TODO: handle error gracefully :)
      console.error(e)
    }
  }

  return (
    <>
      {checkoutState === CHECKOUT_STATES.READY && (
        <div className="checkout-wrapper">
          <Heading>{t('NEXI_DIRECT_CHECKOUT')}</Heading>
          <Text>{t('NEXI_DIRECT_CHECKOUT_INFO')}</Text>
          <Button onClick={initNexiCheckout}>
            {t('NEXI_DIRECT_CHECKOUT_BUTTON')}
          </Button>
        </div>
      )}
      {checkoutState !== CHECKOUT_STATES.COMPLETED && (
        <div id="checkout-container"></div>
      )}
      {checkoutState === CHECKOUT_STATES.COMPLETED && (
        <div className="checkout-wrapper">
          <Heading>{t('NEXI_CHECKOUT_COMPLETED')}</Heading>
          <Text>{t('NEXI_CHECKOUT_COMPLETED_TEXT')}</Text>
        </div>
      )}
      <script src="https://test.checkout.dibspayment.eu/v1/checkout.js?v=1"></script>
    </>
  )
}
