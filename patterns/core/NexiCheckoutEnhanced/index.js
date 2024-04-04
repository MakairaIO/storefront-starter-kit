import { useState } from 'react'
import Script from 'next/script'
import classNames from 'classnames'
import { Text, Heading, FormattedPrice, NexiCheckoutButtons } from '../..'
import {
  useTranslation,
  useConfiguration,
  CHECKOUT_STATES,
} from '../../../utils'

function NexiCheckoutEnhanced(props) {
  const [checkoutState, setCheckoutState] = useState(CHECKOUT_STATES.READY)
  const { getImageLink } = useConfiguration()
  const { t } = useTranslation()

  const {
    products,
    productName,
    shortDesc,
    coverImg,
    overlay,
    direction,
    showPicture,
    customPic,
  } = props
  const product = products[0]

  const cover = getImageLink({ source: coverImg })
  const thumbnail = customPic
    ? getImageLink({ source: customPic.img })
    : product.images[0]

  // console.log({ product, props })

  return (
    <>
      {checkoutState === CHECKOUT_STATES.READY && (
        <section
          className={classNames('checkout-wrapper', `overlay--${overlay}`)}
          style={{
            ['--nexi-background']: `url('${cover}')`,
          }}
        >
          <div
            className={classNames(
              'checkout-wrapper__content',
              `direction--${direction}`
            )}
          >
            {showPicture && (
              <div
                className={classNames(
                  'checkout-wrapper__content__img-container',
                  { vertical: direction === 'vertical' }
                )}
                style={{
                  ['--img-background']: customPic
                    ? customPic.background.rgba
                    : '#FFFFFF',
                }}
              >
                <img alt={product.title} src={thumbnail} />
              </div>
            )}

            <div className="checkout-wrapper__content__text">
              <div className="checkout-wrapper__content__text__heading-container">
                <Heading size="eos" weight="semi-bold">
                  {productName || product.title}
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

              {shortDesc && (
                <Text
                  element="div"
                  className="checkout-wrapper__content__text__longdesc"
                  dangerouslySetInnerHTML={{ __html: shortDesc }}
                />
              )}

              <NexiCheckoutButtons setCheckoutState={setCheckoutState} />
            </div>
          </div>
        </section>
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

export default NexiCheckoutEnhanced
