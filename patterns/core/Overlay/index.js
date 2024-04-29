import { useState, useEffect } from 'react'
import classNames from 'classnames'
import Router from 'next/router'
import { dispatchOverlayClickedEvent } from '../../../utils'

export default function Overlay({ children }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('overlay:show', showOverlay)
    window.addEventListener('overlay:hide', hideOverlay)
    window.addEventListener('overlay:clicked', hideOverlay)
    Router.events.on('routeChangeStart', hideOverlay)

    return () => {
      window.removeEventListener('overlay:show', showOverlay)
      window.removeEventListener('overlay:hide', hideOverlay)
      window.removeEventListener('overlay:clicked', hideOverlay)
      Router.events.off('routeChangeStart', hideOverlay)
    }
  }, [])

  const showOverlay = () => {
    setIsVisible(true)
    document.querySelector('body').classList.add('body--no-overflow')
  }

  const hideOverlay = () => {
    setIsVisible(false)
    document.querySelector('body').classList.remove('body--no-overflow')
  }
  const handleOverlayClick = () => {
    hideOverlay()
    dispatchOverlayClickedEvent()
  }

  const classes = classNames('overlay', {
    ['overlay--visible']: isVisible,
  })

  return (
    <div className={classes} onClick={() => handleOverlayClick()}>
      {children}
    </div>
  )
}
