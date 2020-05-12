import { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from '../..'
import {
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
} from '../../../utils'

const MODAL_ROOT_ID = 'modal-root'

export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  }

  componentDidMount() {
    dispatchShowOverlayEvent()

    this.element = document.getElementById(MODAL_ROOT_ID)
    setTimeout(() => this.forceUpdate(), 50) // small delay to account for overlay transitioning in

    window.addEventListener('overlay:clicked', this.props.closeModal)
  }

  componentWillUnmount() {
    window.removeEventListener('overlay:clicked', this.props.closeModal)
  }

  render() {
    if (this.element === undefined) {
      return null
    }

    const { className = '' } = this.props
    const classes = classNames('modal', className)

    return createPortal(
      <div className={classes}>
        <Button
          variant="link-icon"
          icon="times"
          className="modal__close-button"
          onClick={dispatchOverlayClickedEvent}
        />

        {this.props.children}
      </div>,
      this.element
    )
  }
}

export function ModalRoot() {
  return <div id={MODAL_ROOT_ID}></div>
}
