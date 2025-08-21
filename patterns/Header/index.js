import { Component, createRef } from 'react'
import classNames from 'classnames'
import Router from 'next/router'
import {
  Button,
  Link,
  DesktopNavigation,
  MobileNavigation,
  SwitchLanguage,
} from '..'
import {
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
  TranslationContext,
} from '../../utils'
import EcommerceOneBdge from './EcommerceOneBadge.js'

const MENU_BREAKPOINT = 990
const TABLET_MENU_BREAKPOINT = 990
const DESKTOP_MENU_BREAKPOINT = 1366

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDesktop: false,
      isTablet: false,
      renderMobileNavigation: false,
      isMobileNavigationVisible: false,
      isAutosuggestBoxVisible: false,
      searchPhrase: '',
      autosuggestResult: {},
      isSearchMenuRendered: false,
    }

    this.mobileSearchInputRef = createRef()
  }

  componentDidMount() {
    window.addEventListener('overlay:clicked', this.hideMobileNavigation)
    window.addEventListener('resize', this.handleResize)

    Router.events.on('routeChangeComplete', this.handleRouteChange)
    Router.events.on('hashChangeComplete', this.handleRouteChange)

    // initial check for what navigation to render
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('overlay:clicked', this.hideMobileNavigation)
    window.removeEventListener('resize', this.handleResize)

    Router.events.off('routeChangeComplete', this.handleRouteChange)
    Router.events.off('hashChangeComplete', this.handleRouteChange)
  }

  handleResize = () => {
    const { renderMobileNavigation } = this.state

    if (window.innerWidth >= DESKTOP_MENU_BREAKPOINT) {
      this.setState({ isDesktop: true })
    } else {
      this.setState({ isDesktop: false })
    }

    if (
      window.innerWidth >= TABLET_MENU_BREAKPOINT &&
      window.innerWidth < DESKTOP_MENU_BREAKPOINT
    ) {
      this.setState({ isTablet: true })
    } else {
      this.setState({ isTablet: false })
    }

    if (window.innerWidth < MENU_BREAKPOINT) {
      if (renderMobileNavigation === false) {
        this.setState({ renderMobileNavigation: true })
      }
    } else {
      if (renderMobileNavigation === true) {
        this.setState({ renderMobileNavigation: false })
      }
    }
  }

  showMobileNavigation = (isHover = false, menu = {}) => {
    if (isHover !== true || (menu && menu.uuid && menu.css !== 'sign_up')) {
      dispatchShowOverlayEvent()
      this.setState({ isMobileNavigationVisible: true })
    }
  }

  hideMobileNavigation = () => {
    this.setState({ isMobileNavigationVisible: false })
  }

  hideMobileNavigationOnPageChange = () => {
    const { isMobileNavigationVisible } = this.state

    // Perform an explicit check here to avoid accidentally closing the <MobileFilter> on page navigations
    if (isMobileNavigationVisible) {
      // for simplicity, we just simulate a click on the overlay and let the lifecycle of the components take care of everything
      dispatchOverlayClickedEvent()
    }
  }

  handleSearchPhraseChange = (event) => {
    this.setState({ searchPhrase: event.target.value })
  }

  activateMobileSearch = () => {
    this.showMobileNavigation()
    this.mobileSearchInputRef.current.focus()
  }

  handleRouteChange = () => {
    this.hideMobileNavigationOnPageChange()
  }

  showSearchMenu = () => {
    this.setState({ isSearchMenuRendered: true })
    this.showMobileNavigation()
  }

  hideSearchMenu = () => {
    this.setState({ isSearchMenuRendered: false })
    this.hideMobileNavigation()
  }

  render() {
    const { variant = 'reduced', menu = [] } = this.props
    const {
      isDesktop,
      isTablet,
      renderMobileNavigation,
      isMobileNavigationVisible,
    } = this.state
    const { t } = this.context

    const classes = classNames('pattern header', `header--${variant}`)

    return (
      <>
        <header className={classes}>
          <EcommerceOneBdge />
          <div className="header__wrapper">
            {/* {variant == 'full' && (
              <span style={{ visibility: 'hidden' }}></span>
            )} */}
            {variant != 'full' && (
              <Button
                variant="icon-only"
                icon=""
                className="header__menu-button header__search-left"
              />
            )}

            {variant == 'full' && (
              <Link href={t('HOME_LINK')}>
                <img
                  src="/assets/images/header/logo.svg"
                  alt="Logo"
                  className="header__logo"
                />
              </Link>
            )}
            {variant != 'full' && (
              <img
                src="/assets/images/header/logo.svg"
                alt="Logo"
                className="header__logo"
              />
            )}

            <div className="header__right">
              <DesktopNavigation
                isShow={isDesktop}
                menu={menu}
                showMobileNavigation={
                  variant == 'full' ? this.showMobileNavigation : () => {}
                }
              />

              {variant == 'full' && <SwitchLanguage />}
              <Button
                variant="icon-only"
                icon="bars"
                className="header__menu-button"
                onClick={this.showMobileNavigation}
              />
            </div>
          </div>
        </header>

        <MobileNavigation
          menu={menu}
          isDesktop={isDesktop}
          isTablet={isTablet}
          renderMobileNavigation={renderMobileNavigation}
          isMobileNavigationVisible={isMobileNavigationVisible}
          hideMobileNavigation={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of the components take care of everything
          mobileSearchInputRef={this.mobileSearchInputRef}
          searchPhrase={this.state.searchPhrase}
          changeSearchPhrase={this.handleSearchPhraseChange}
          isSearchMenuRendered={this.state.isSearchMenuRendered}
          showSearchMenu={this.showSearchMenu}
          hideSearchMenu={this.hideSearchMenu}
        />
      </>
    )
  }
}

Header.contextType = TranslationContext

export default Header
export { default as headerVariants } from './variants.js'
