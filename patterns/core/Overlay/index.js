import { Component } from 'react'
import classNames from 'classnames'
import Router from 'next/router'
import { dispatchOverlayClickedEvent } from '../../../utils'

export default class Overlay extends Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.addEventListener('overlay:show', this.showOverlay)
    window.addEventListener('overlay:hide', this.hideOverlay)
    window.addEventListener('overlay:clicked', this.hideOverlay)
    Router.events.on('routeChangeStart', this.hideOverlay)
  }

  componentWillUnmount() {
    window.removeEventListener('overlay:show', this.showOverlay)
    window.removeEventListener('overlay:hide', this.hideOverlay)
    window.removeEventListener('overlay:clicked', this.hideOverlay)
    Router.events.off('routeChangeStart', this.hideOverlay)
  }

  showOverlay = () => {
    this.setState({ isVisible: true })
    document.querySelector('body').classList.add('body--no-overflow')
  }

  hideOverlay = () => {
    this.setState({ isVisible: false })
    document.querySelector('body').classList.remove('body--no-overflow')
  }

  handleOverlayClick = () => {
    this.hideOverlay()
    dispatchOverlayClickedEvent()
  }

  render() {
    const { children } = this.props
    const { isVisible } = this.state

    const classes = classNames('overlay', {
      ['overlay--visible']: isVisible,
    })

    return (
      <div className={classes} onClick={this.handleOverlayClick}>
        {children}
      </div>
    )
  }
}
