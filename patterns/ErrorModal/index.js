import PropTypes from 'prop-types'
import { Modal, Text } from '../index'
import { useTranslation } from '../../utils'

const ErrorModal = (props) => {
  const { isVisible, closeModal = () => {} } = props
  const { t } = useTranslation()

  if (!isVisible) return null

  return (
    <Modal closeModal={closeModal} className="error-modal">
      <Text>{t('CART_ERROR')}</Text>
    </Modal>
  )
}

ErrorModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
}

export default ErrorModal
