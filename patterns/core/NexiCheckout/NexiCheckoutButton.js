import { useState } from 'react'
import { Text, Button, Heading, Image, FormattedPrice, Dropdown } from '../..'
import { useTranslation } from '../../../utils'
import allLanguages from '../../../config/allLanguages'
import Script from 'next/script'

const CHECKOUT_STATES = Object.freeze({
  READY: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
})

export function NexiCheckoutButton(props) {
  const [checkoutState, setCheckoutState] = useState(CHECKOUT_STATES.READY)
  const { t, language } = useTranslation()

  const quantities = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]

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

  const product = props.items[0]

  console.log({ product })

  return (
    <>
      {checkoutState === CHECKOUT_STATES.READY && (
        <div
          className="checkout-wrapper"
          style={{
            ['--nexi-background']: `url('https://images.unsplash.com/photo-1616449973117-0e1d99c56ed3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, // TODO: add prop for image
          }}
        >
          <div className="checkout-wrapper__content">
            <div className="checkout-wrapper__content__img-container">
              <Image
                alt={product.title}
                options={{
                  desktop: {
                    source: product.images[0],
                    width: 768,
                    media: '(min-width: 768px)',
                  },
                  mobile: {
                    source: product.images[0],
                    width: 480,
                    media: null,
                  },
                }}
              />
            </div>

            <div className="checkout-wrapper__content__text">
              <div className="checkout-wrapper__content__text__heading-container">
                <Heading size="eos" weight="semi-bold">
                  {t('NEXI_DIRECT_CHECKOUT')}
                </Heading>

                <div className="checkout-wrapper__content__text__heading-container__price-container">
                  {product.active && (
                    <span className="checkout-wrapper__content__text__heading-container__price-container__badge" />
                  )}
                  <FormattedPrice
                    price={product.price}
                    className="checkout-wrapper__content__text__heading-container__price-container__price"
                  />
                </div>
              </div>

              <Text element="p">{t('NEXI_DIRECT_CHECKOUT_INFO')}</Text>

              <Text
                element="p"
                className="checkout-wrapper__content__text__longdesc"
              >
                Short description of the product
              </Text>

              <div className="checkout-wrapper__content__text__buttons-container">
                <Dropdown
                  id="sizeVariant"
                  value={quantity}
                  options={quantities}
                  onChange={({ value }) => setQuantity(value)}
                  className="checkout-wrapper__content__text__buttons-container__quantity-select"
                />

                <Button onClick={initNexiCheckout} variant="primary-alt">
                  {t('NEXI_DIRECT_CHECKOUT_BUTTON')}
                </Button>
              </div>
            </div>
          </div>
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
      <Script src="https://test.checkout.dibspayment.eu/v1/checkout.js?v=1" />
    </>
  )
}
