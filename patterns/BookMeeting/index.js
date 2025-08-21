import { Button, HubspotMeetingWidget } from '..'
import Modal from '../core/Modal'
import classNames from 'classnames'
import { dispatchOverlayClickedEvent } from '../../utils'
import { useState, useEffect } from 'react'

function BookMeeting({ link, title, theme = 'none' }) {
  const [isOpen, setIsOpen] = useState(false)

  function showModal() {
    dispatchOverlayClickedEvent()
    setIsOpen(true)
  }

  function hideModal() {
    setIsOpen(false)
  }

  if (!link) return null

  return (
    <>
      <div className="meetingModal__wrapper">
        <Button
          onClick={showModal}
          variant={theme === 'white' ? 'secondary' : 'primary'}
        >
          {title}
        </Button>
      </div>
      {isOpen && <MeetingModal closeModal={hideModal} link={link} />}
    </>
  )
}

function MeetingModal(props) {
  const { className = '', closeModal, link, title } = props
  const classes = classNames('', className)

  useEffect(() => {
    window.addEventListener('overlay:clicked', closeModal)
    return () => {
      window.removeEventListener('overlay:clicked', closeModal)
    }
  })

  return (
    <Modal {...props} closeModal={closeModal} className={classes}>
      {/* <div className="meetingModal"> */}
      <HubspotMeetingWidget link={link} title={title} />
      {/* </div> */}
    </Modal>
  )
}

export default BookMeeting
