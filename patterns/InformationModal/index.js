import { Icon, Copytext, Button } from './..'
import Modal from './../core/Modal'
import classNames from 'classnames'
import { useTranslation, dispatchOverlayClickedEvent } from '../../utils'
import { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'

function InformationModal() {
  const [informationData, setInformationData] = useState({})
  const [callBack, setCallBack] = useState(null)

  useEffect(() => {
    window.addEventListener('showInformation:info', handleAddToCartStatus)
    return () => {
      window.removeEventListener('showInformation:info', hideModal)
    }
  })

  function handleAddToCartStatus(e) {
    showModal(e.detail)
  }

  function showModal(data) {
    setInformationData(data)
    if (data.callBack && typeof data.callBack === 'function') {
      setCallBack(() => data.callBack)
    }
  }

  function hideModal() {
    setInformationData({})
    if (callBack && typeof callBack === 'function') {
      callBack()
    }
  }

  if (isEmpty(informationData)) return null

  return <InfoModal closeModal={hideModal} {...informationData} />
}

function InfoModal(props) {
  const {
    className = '',
    button = '',
    link = '',
    icon = '',
    message = '',
    closeModal,
  } = props
  const classes = classNames('information-modal', className)
  const { t } = useTranslation()

  useEffect(() => {
    window.addEventListener('overlay:clicked', closeModal)
    return () => {
      window.removeEventListener('overlay:clicked', closeModal)
    }
  })

  return (
    <Modal {...props} closeModal={closeModal} className={classes}>
      <div className="modal__icon-wrapper">
        {icon && <Icon symbol={icon} />}
        <div>
          <Copytext
            size="delta"
            dangerouslySetInnerHTML={{ __html: t(message) || message }}
          ></Copytext>
        </div>
      </div>

      {button && (
        <div className="modal__button-row">
          <Button
            variant="secondary"
            onClick={dispatchOverlayClickedEvent}
            href={link}
          >
            {button}
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default InformationModal
