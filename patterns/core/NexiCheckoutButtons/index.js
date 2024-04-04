import { useState } from 'react'
import { Dropdown, Button } from '../../'
import { useTranslation, CHECKOUT_STATES } from '../../../utils'
import allLanguages from '../../../config/allLanguages'

const quantities = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
]

export default function NexiCheckoutButton(props) {
  const { setCheckoutState } = props
  const { language, t } = useTranslation()

  const [quantity, setQuantity] = useState(1)

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
    <div className="checkout-buttons-wrapper">
      <Dropdown
        id="sizeVariant"
        value={quantity}
        options={quantities}
        onChange={({ value }) => setQuantity(value)}
        className="checkout-buttons-wrapper__quantity-select"
      />

      <Button onClick={initNexiCheckout} variant="primary-alt">
        {t('NEXI_DIRECT_CHECKOUT_BUTTON')}
      </Button>
    </div>
  )
}
