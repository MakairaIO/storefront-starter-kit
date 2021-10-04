import { Component, createRef } from 'react'
import Router from 'next/router'
import { Button, GlobalNavigation, Link } from '..'
import InfoLinks from './InfoLinks'
import Search from './Search'
import Actions from './Actions'
import {
  throttle,
  debounce,
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
  filterInternalMakairaFields,
} from '../../utils'
import AutosuggestBox from './AutoSuggestion/AutosuggestBox'

const DESKTOP_MENU_BREAKPOINT = 800

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderMobileNavigation: false,
      isMobileNavigationVisible: false,
      isAutosuggestBoxVisible: false,
      searchPhrase: '',
      autosuggestResult: {},
      totalResultCount: 0,
    }

    this.handleResize = throttle(this.handleResize, 200)
    this.fetchAutosuggestResult = debounce(this.fetchAutosuggestResult, 250)

    this.mobileSearchInputRef = createRef()
  }

  componentDidMount() {
    window.addEventListener('overlay:clicked', this.hideMobileNavigation)
    window.addEventListener('resize', this.handleResize)

    Router.events.on('routeChangeComplete', this.handleRouteChange)

    // initial check for what navigation to render
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('overlay:clicked', this.hideMobileNavigation)
    window.removeEventListener('resize', this.handleResize)

    Router.events.off('routeChangeComplete', this.handleRouteChange)
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

  showAutosuggestBox = () => {
    this.setState({ isAutosuggestBoxVisible: true })
  }

  hideAutosuggestBox = () => {
    this.setState({ isAutosuggestBoxVisible: false })
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
    this.setState(
      { searchPhrase: event.target.value },
      this.fetchAutosuggestResult
    )
  }

  handleSearchResult = () => {
    const searchResult = this.state.autosuggestResult

    const totalResultCount = Object.values(searchResult).reduce(
      (total, resultType) => total + resultType.total,
      0
    )

    if (this.state.searchPhrase && totalResultCount > 0) {
      this.setState({ totalResultCount }, this.showAutosuggestBox)
    } else {
      this.hideAutosuggestBox()
    }
  }

  fetchAutosuggestResult = async () => {
    const { searchPhrase } = this.state

    const result = await this.props.fetchAutosuggestResult(searchPhrase)
    const filteredResult = filterInternalMakairaFields(result)

    this.setState(
      { autosuggestResult: filteredResult },
      this.handleSearchResult
    )
  }

  handleSearchFormSubmit = (event) => {
    event.preventDefault()

    const { searchPhrase } = this.state
    this.props.submitSearchForm(searchPhrase)
  }

  activateMobileSearch = () => {
    this.showMobileNavigation()
    this.mobileSearchInputRef.current.focus()
  }

  handleRouteChange = () => {
    this.hideMobileNavigationOnPageChange()
    this.hideAutosuggestBox()
  }

  render() {
    const { menu = [] } = this.props

    return (
      <>
        <header className="header">
          <Button
            variant="icon-only"
            icon="bars"
            className="header__menu-button"
            onClick={this.showMobileNavigation}
          />

          <Link href="/">
            <img
              src="/assets/images/header/logo_dummy.svg"
              alt="Logo"
              className="header__logo"
            />
          </Link>

          <div className="header__outer-container">
            <InfoLinks />

            <div className="header__inner-container">
              <Search
                searchPhrase={this.state.searchPhrase}
                changeSearchPhrase={this.handleSearchPhraseChange}
                submitForm={this.handleSearchFormSubmit}
                activateMobileSearch={this.activateMobileSearch}
              />

              <Actions />
            </div>
          </div>
        </header>

        {this.state.isAutosuggestBoxVisible && (
          <AutosuggestBox
            searchResult={this.state.autosuggestResult}
            totalResultCount={this.state.totalResultCount}
            closeSearchPopup={this.hideAutosuggestBox}
            goToSearchPage={this.handleSearchFormSubmit}
          />
        )}

        <GlobalNavigation
          menu={menu}
          renderMobileNavigation={this.state.renderMobileNavigation}
          isMobileNavigationVisible={this.state.isMobileNavigationVisible}
          hideMobileNavigation={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of the components take care of everything
          mobileSearchInputRef={this.mobileSearchInputRef}
          searchPhrase={this.state.searchPhrase}
          changeSearchPhrase={this.handleSearchPhraseChange}
          submitForm={this.handleSearchFormSubmit}
        />
      </>
    )
  }
}

export default Header
export { default as headerVariants } from './variants.js'
