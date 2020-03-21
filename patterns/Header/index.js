import { Component } from 'react'
import { Button, GlobalNavigation } from '..'
import InfoLinks from './InfoLinks'
import Search from './Search'
import Actions from './Actions'
import {
  throttle,
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
} from '../../utils'

const DESKTOP_MENU_BREAKPOINT = 800

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderMobileNavigation: false,
      isMobileNavigationVisible: false,
    }

    this.handleResize = throttle(this.handleResize, 200)
  }

  componentDidMount() {
    window.addEventListener('overlay:clicked', this.hideMobileNavigation)
    window.addEventListener('resize', this.handleResize)

    // initial check for what navigation to render
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('overlay:clicked', this.hideMobileNavigation)
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const { renderMobileNavigation } = this.state

    if (window.innerWidth < DESKTOP_MENU_BREAKPOINT) {
      if (renderMobileNavigation === false) {
        this.setState({ renderMobileNavigation: true })
      }
    } else {
      if (renderMobileNavigation === true) {
        this.setState({ renderMobileNavigation: false })
      }
    }
  }

  showMobileNavigation = () => {
    dispatchShowOverlayEvent()
    this.setState({ isMobileNavigationVisible: true })
  }

  hideMobileNavigation = () => {
    this.setState({ isMobileNavigationVisible: false })
  }

  render() {
    const { menu = [] } = this.props

    return (
      <>
        <header className="header">
          <Button
            icon="bars"
            className="header__menu-button"
            onClick={this.showMobileNavigation}
          />

          <img
            src="/assets/images/header/logo_dummy.svg"
            alt="Logo"
            className="header__logo"
          />

          <div className="header__outer-container">
            <InfoLinks />

            <div className="header__inner-container">
              <Search />

              <Actions />
            </div>
          </div>
        </header>

        <GlobalNavigation
          menu={menu}
          renderMobileNavigation={this.state.renderMobileNavigation}
          isMobileNavigationVisible={this.state.isMobileNavigationVisible}
          hideMobileNavigation={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of this component take care of everything
        />
      </>
    )
  }
}

export default Header
export { default as headerVariants } from './variants.js'
