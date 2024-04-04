import { useState } from 'react'
import classNames from 'classnames'
import Script from 'next/script'
import { NexiCheckoutButtons, Heading, Text, FormattedPrice } from '../../'
import { CHECKOUT_STATES, useTranslation } from '../../../utils'

function NexiSimple(props) {
  const { products, checkoutTitle, shortDesc, centered } = props
  const { t } = useTranslation()

  const product = products[0]

  const [checkoutState, setCheckoutState] = useState(CHECKOUT_STATES.READY)

  console.log({ props })

  return (
    <>
      <section className={classNames('nexi-simple', { centered })}>
        <Heading size="eos" weight="semi-bold">
          {checkoutTitle || product.title}
        </Heading>

        <div className="nexi-simple__price-container">
          {product.active && (
            <span className="nexi-simple__price-container__badge" />
          )}
          <FormattedPrice
            price={product.price}
            className="nexi-simple__price-container__price"
          />
        </div>

        {shortDesc && (
          <Text
            element="div"
            dangerouslySetInnerHTML={{ __html: shortDesc }}
            className="nexi-simple__text"
          />
        )}

        <NexiCheckoutButtons setCheckoutState={setCheckoutState} />
      </section>

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

export default NexiSimple
