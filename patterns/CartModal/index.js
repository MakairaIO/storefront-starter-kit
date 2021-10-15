import PropTypes from 'prop-types'
import { Button, Modal, Text } from '../index'
import { dispatchOverlayClickedEvent, useTranslation } from '../../utils'

const CartModal = (props) => {
  const { t } = useTranslation()

  const { isVisible, closeModal = () => {} } = props

  if (!isVisible) return null

  return (
    <Modal closeModal={closeModal} className="cart-modal">
      <div className="cart-modal__wrapper">
        <Text>{t('CART_MODAL')}</Text>

        <div className="cart-modal__buttons">
          <Button
            onClick={() => {
              closeModal()
              dispatchOverlayClickedEvent()
            }}
          >
            {t('CART_MODAL_CONTINUE_BUTTON')}
          </Button>
          <Button
            href={`${process.env.FAILOVER_URL}/shop/cart`}
            isInternalRoute
          >
            {t('CART_MODAL_BUTTON')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

CartModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
}

export default CartModal
