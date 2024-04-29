import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { Button } from '../..'
import {
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
} from '../../../utils'

const MODAL_ROOT_ID = 'modal-root'

type ModalProps = {
  children: React.ReactNode
  closeModal: () => void
  className?: string
}

export default function Modal({
  children,
  closeModal,
  className,
}: ModalProps): JSX.Element | null {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    dispatchShowOverlayEvent()

    const modalElement = document.getElementById(MODAL_ROOT_ID)
    if (modalElement) {
      setElement(modalElement)

      const handleOverlayClick = () => closeModal()
      window.addEventListener('overlay:clicked', handleOverlayClick)

      return () => {
        window.removeEventListener('overlay:clicked', handleOverlayClick)
      }
    }
  }, [closeModal])

  if (!element) {
    return null
  }

  const classes = classNames('modal', className)

  return createPortal(
    <div className={classes}>
      <Button
        variant="link-icon"
        icon="times"
        className="modal__close-button"
        onClick={dispatchOverlayClickedEvent}
      />
      {children}
    </div>,
    element
  )
}

export function ModalRoot(): JSX.Element {
  return <div id={MODAL_ROOT_ID}></div>
}
