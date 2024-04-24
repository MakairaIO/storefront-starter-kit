import { createRef, useEffect, useState } from 'react'
import Router from 'next/router'
import { Button, GlobalNavigation, Link } from '../..'
import InfoLinks from './InfoLinks'
import Search from './Search'
import Actions from './Actions'
import {
  throttle,
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
  filterInternalMakairaFields,
} from '../../../utils'
import AutosuggestBox from './AutoSuggestion/AutosuggestBox'

const DESKTOP_MENU_BREAKPOINT = 800

function Header(props) {
  const [state, setState] = useState({
    renderMobileNavigation: false,
    isMobileNavigationVisible: false,
    isAutosuggestBoxVisible: false,
    searchPhrase: '',
    autosuggestResult: {},
    totalResultCount: 0,
  })

  const mobileSearchInputRef = createRef()

  useEffect(() => {
    const handleResize = throttle(() => {
      const { renderMobileNavigation } = state
      if (window.innerWidth < DESKTOP_MENU_BREAKPOINT) {
        if (!renderMobileNavigation) {
          setState({ ...state, renderMobileNavigation: true })
        }
      } else {
        if (renderMobileNavigation) {
          setState({ ...state, renderMobileNavigation: false })
        }
      }
    }, 200)

    const hideMobileNavigationOnPageChange = () => {
      const { isMobileNavigationVisible } = state
      // Perform an explicit check here to avoid accidentally closing the <MobileFilter> on page navigations
      if (isMobileNavigationVisible) {
        // for simplicity, we just simulate a click on the overlay and let the lifecycle of the components take care of everything
        dispatchOverlayClickedEvent()
      }
    }

    const handleRouteChange = () => {
      hideMobileNavigationOnPageChange()
      hideAutosuggestBox()
      hideLoginBox()
      hideWishlistBox()
      hideCartBox()
    }

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('overlay:clicked', hideMobileNavigation)
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [
    state,
    hideCartBox,
    hideWishlistBox,
    hideLoginBox,
    hideAutosuggestBox,
    hideMobileNavigation,
  ])

  const toggleLoginBox = () => {
    const { isLoginBoxVisible } = state
    isLoginBoxVisible ? hideLoginBox() : showLoginBox()
  }

  const showLoginBox = () => {
    setState({
      ...state,
      isAutosuggestBoxVisible: false,
      isLoginBoxVisible: true,
      isWishlistBoxVisible: false,
      isCartBoxVisible: false,
    })
  }

  const hideLoginBox = () => {
    setState({ ...state, isLoginBoxVisible: false })
  }

  const showMobileNavigation = () => {
    dispatchShowOverlayEvent()
    setState({ ...state, isMobileNavigationVisible: true })
  }

  const hideMobileNavigation = () => {
    setState({ ...state, isMobileNavigationVisible: false })
  }

  const showAutosuggestBox = () => {
    setState({
      ...state,
      isAutosuggestBoxVisible: true,
      isLoginBoxVisible: false,
      isCartBoxVisible: false,
      isWishlistBoxVisible: false,
    })
  }

  const hideAutosuggestBox = () => {
    setState({ ...state, isAutosuggestBoxVisible: false })
  }

  const showWishlistBox = () => {
    setState({
      ...state,
      isAutosuggestBoxVisible: false,
      isLoginBoxVisible: false,
      isWishlistBoxVisible: true,
      isCartBoxVisible: false,
    })
  }

  const hideWishlistBox = () => {
    setState({ ...state, isWishlistBoxVisible: false })
  }

  const showCartBox = () => {
    setState({
      ...state,
      isAutosuggestBoxVisible: false,
      isLoginBoxVisible: false,
      isWishlistBoxVisible: false,
      isCartBoxVisible: true,
    })
  }

  const hideCartBox = () => {
    setState({ ...state, isCartBoxVisible: false })
  }

  const handleSearchPhraseChange = (event) => {
    setState({ ...state, searchPhrase: event.target.value })
    fetchAutosuggestResult()
  }

  const handleSearchResult = () => {
    const { searchResult } = state
    const totalResultCount = Object.values(searchResult)
      .filter((type) => !isNaN(type.total))
      .reduce((total, resultType) => total + resultType.total, 0)

    if (state.searchPhrase && totalResultCount > 0) {
      setState({ ...state, totalResultCount })
      showAutosuggestBox()
    } else {
      hideAutosuggestBox()
    }
  }

  const fetchAutosuggestResult = async () => {
    const { searchPhrase } = state

    if (searchPhrase.length === 0) return

    const result = await props.fetchAutosuggestResult(searchPhrase)
    const filteredResult = filterInternalMakairaFields(result)

    setState({ ...state, autosuggestResult: filteredResult })
    handleSearchResult()
  }

  const handleSearchFormSubmit = (event) => {
    event.preventDefault()
    const { searchPhrase } = state
    props.submitSearchForm(searchPhrase)
  }

  const activateMobileSearch = () => {
    showMobileNavigation()
    mobileSearchInputRef.current.focus()
  }

  const toggleWishlistBox = () => {
    const { isWishlistBoxVisible } = state
    isWishlistBoxVisible ? hideWishlistBox() : showWishlistBox()
  }

  const toggleCartBox = () => {
    const { isCartBoxVisible } = state
    isCartBoxVisible ? hideCartBox() : showCartBox()
  }

  return (
    <>
      <header className="header">
        <Button
          variant="icon-only"
          icon="bars"
          className="header__menu-button"
          onClick={showMobileNavigation}
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
              searchPhrase={state.searchPhrase}
              changeSearchPhrase={handleSearchPhraseChange}
              submitForm={handleSearchFormSubmit}
              activateMobileSearch={activateMobileSearch}
            />

            <Actions
              isLoginBoxVisible={state.isLoginBoxVisible}
              isWishlistBoxVisible={state.isWishlistBoxVisible}
              isCartBoxVisible={state.isCartBoxVisible}
              toggleLoginBox={toggleLoginBox}
              toggleWishlistBox={toggleWishlistBox}
              toggleCartBox={toggleCartBox}
            />
          </div>
        </div>
      </header>

      {state.isAutosuggestBoxVisible && (
        <AutosuggestBox
          searchResult={state.autosuggestResult}
          totalResultCount={state.totalResultCount}
          closeSearchPopup={hideAutosuggestBox}
          goToSearchPage={handleSearchFormSubmit}
        />
      )}

      <GlobalNavigation
        menu={props.menu}
        renderMobileNavigation={state.renderMobileNavigation}
        isMobileNavigationVisible={state.isMobileNavigationVisible}
        hideMobileNavigation={dispatchOverlayClickedEvent}
        mobileSearchInputRef={mobileSearchInputRef}
        searchPhrase={state.searchPhrase}
        changeSearchPhrase={handleSearchPhraseChange}
        submitForm={handleSearchFormSubmit}
      />
    </>
  )
}

export default Header
export { default as headerVariants } from './variants.js'
