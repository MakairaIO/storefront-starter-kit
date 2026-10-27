import {
  useTranslation,
  dispatchOverlayClickedEvent,
  ADD_TO_CART_DISPATCH_EVENT_NAME,
  useCheckout,
} from '../../../utils'
import { Modal, Button, Heading } from '../..'
import { useEffect, useState } from 'react'
import Recommendations from './Recommendations'
import { useRouter } from 'next/router'

export default function AddCartSuccessModal() {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const { loading, goToCheckout } = useCheckout()

  const [{ isVisible, recommendations }, setState] = useState({
    isVisible: false,
    recommendations: undefined,
  })

  function onCloseModal() {
    setState({ isVisible: false, recommendations: undefined })
  }

  function onContinueShopping() {
    dispatchOverlayClickedEvent()
  }

  function onProductAddedToCart({ data }) {
    setState({ isVisible: true, recommendations: data.recommendations })
  }

  useEffect(() => {
    window.addEventListener(
      ADD_TO_CART_DISPATCH_EVENT_NAME,
      onProductAddedToCart
    )

    window.addEventListener('overlay:clicked', onCloseModal)

    return () => {
      window.removeEventListener(
        ADD_TO_CART_DISPATCH_EVENT_NAME,
        onProductAddedToCart
      )
      window.removeEventListener('overlay:clicked', onCloseModal)
    }
  }, [])

  useEffect(() => {
    onCloseModal()
  }, [asPath])

  if (!isVisible) return null

  const products = (recommendations?.items ?? []).map((item) => item.fields)

  return (
    <Modal
      closeModal={onCloseModal}
      className="cart-modal"
      hideCloseBtn={false}
      top="50%"
    >
      <div className="cart-modal__content">
        <div className="cart-modal__content--top">
          <div className="cart-modal__content--top--title">
            <Heading className="cart-modal__title">
              {t('ADD_TO_CART_MESSAGE_SUCCESS')}
            </Heading>
          </div>
          <div className="cart-modal__content--top--buttons">
            <Button
              variant="primary"
              size="small"
              loading={loading}
              onClick={goToCheckout}
              className="cart-modal__cart-btn"
            >
              {t('CART_TO_CHECKOUT')}
            </Button>
            <Button
              onClick={onContinueShopping}
              variant="secondary"
              size="small"
              className="cart-modal__cart-btn cart-modal__cart-btn--continue"
            >
              {t('CONTINUE_SHOPPING')}
            </Button>
          </div>
        </div>
        {products.length > 0 && <Recommendations products={products} />}
      </div>
    </Modal>
  )
}
