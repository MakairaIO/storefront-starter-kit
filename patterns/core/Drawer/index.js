import { Component } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Button } from '../..'
import {
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
  dispatchHideOverlayEvent,
} from '../../../utils'

const DRAWER_ROOT_ID = 'drawer-root'
const TRANSITION_TIME = 200

export default class Drawer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      removeSelf: true,
    }
  }

  showContent() {
    this.setState({ removeSelf: false }, () => {
      if (this.props.overlay) {
        if (this.props.overlay) {
          dispatchShowOverlayEvent()
          window.addEventListener('overlay:clicked', this.props.onClose)
        }
      }
      setTimeout(() => {
        this.setState({ open: true })
      }, TRANSITION_TIME)
    })
  }

  hideContent() {
    this.setState({ open: false }, () => {
      if (this.props.overlay) {
        dispatchHideOverlayEvent()
        window.removeEventListener('overlay:clicked', this.props.onClose)
      }
      setTimeout(() => {
        this.setState({ removeSelf: true })
      }, TRANSITION_TIME)
    })
  }

  componentDidMount() {
    this.element = document.getElementById(DRAWER_ROOT_ID)
    if (this.props.open) {
      this.showContent()
      setTimeout(() => this.forceUpdate(), 50) // small delay to account for overlay transitioning in
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (!this.props.open) {
        this.hideContent()
      } else {
        this.showContent()
      }
    }
  }

  componentWillUnmount() {
    if (this.props.overlay) {
      window.removeEventListener('overlay:clicked', this.props.onClose)
    }
  }

  onCloseDrawer = () => {
    if (this.props.overlay) {
      dispatchOverlayClickedEvent()
    } else {
      this.props.onClose()
    }
  }

  render() {
    if (this.element === undefined) {
      return null
    }

    if (this.state.removeSelf) return null

    const { className = '', placement, width, height, children } = this.props
    const classes = classNames('drawer', `drawer-${placement}`, className, {
      'drawer--open': this.state.open,
    })

    return createPortal(
      <div className={classes}>
        <Button
          variant="link-icon"
          icon="times"
          className="modal__close-button"
          onClick={this.onCloseDrawer}
        />
        <div
          className="content"
          style={{
            width: width ? width + 'px' : undefined,
            height: height ? height + 'px' : undefined,
          }}
        >
          {children}
        </div>
      </div>,
      this.element
    )
  }
}

Drawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  overlay: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  className: PropTypes.string,
}

export function DrawerRoot() {
  return <div id={DRAWER_ROOT_ID}></div>
}
