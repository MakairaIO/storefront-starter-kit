/* eslint-disable */
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button, Link, SwitchLanguage } from '../..'
import NavigationItem from './NavigationItem'
import DesktopNavigation from '../DesktopNavigation'
import NavigationMenu from './NavigationMenu'
import { useTranslation } from '../../../utils'

export default function MobileNavigation(props) {
  const {
    menu = [],
    isDesktop = false,
    isTablet = false,
    isMobileNavigationVisible,
    hideMobileNavigation,
    renderMobileNavigation,
  } = props

  const TRANSITION_DELAY_IN_MS = 200
  const { t } = useTranslation()
  const [showedMenu, setShowedMenu] = useState(menu[0])
  const [timerId, setTimer] = useState(null)

  const flyoutClasses = classNames('pattern mobile-navigation__flyout', {
    'mobile-navigation__flyout--visible': isMobileNavigationVisible,
    // 'mobile-navigation__flyout--visible': true,
  })

  const findMenuToShow = (menu = {}) => {
    if (menu && menu.uuid && menu.css !== 'sign_up') {
      setShowedMenu(menu)
    }
  }

  const closeFlyout = () => {
    if (isDesktop) {
      setTimer(
        setTimeout(() => {
          hideMobileNavigation()
        }, TRANSITION_DELAY_IN_MS)
      )
    }
  }

  useEffect(() => {
    if (!isMobileNavigationVisible) {
      setShowedMenu(menu[0])
    }
  }, [isMobileNavigationVisible])

  return (
    <div
      className={flyoutClasses}
      onMouseEnter={() => clearTimeout(timerId)}
      onMouseLeave={() => closeFlyout()}
    >
      {renderMobileNavigation && (
        <>
          <div className="mobile-navigation__header mobile-navigation__header--bars">
            {/* <span style={{ visibility: 'hidden' }}></span> */}

            <Link href={t('HOME_LINK')}>
              <img
                src="/assets/images/header/logo-invert-s.svg"
                alt="Logo"
                className="header__logo"
              />
            </Link>

            <Button
              variant="icon-only"
              icon="times"
              onClick={hideMobileNavigation}
            />
          </div>

          <nav className="mobile-navigation" arial-label="Primary Navigation">
            <ul>
              {menu.map((entry) => (
                <NavigationItem
                  key={entry.uuid}
                  {...entry}
                  isMainCategory={true}
                  hideMobileNavigation={hideMobileNavigation}
                />
              ))}
            </ul>
          </nav>
        </>
      )}
      {!renderMobileNavigation && (
        <div className="navigation__header--wrapper">
          <div className="navigation__header">
            <Link href={t('HOME_LINK')}>
              <img
                src="/assets/images/header/logo-invert.svg"
                alt="Logo"
                className="header__logo"
              />
            </Link>

            <div className="navigation__header--actions">
              <DesktopNavigation
                isShow={isDesktop && isMobileNavigationVisible}
                menu={menu}
                showedMenu={showedMenu}
                findMenuToShow={(menu) => findMenuToShow(menu)}
              />

              <span style={{ visibility: 'hidden', margin: '0 24px' }}></span>

              <SwitchLanguage darkTheme />
              <Button
                variant="icon-only"
                icon="times"
                onClick={hideMobileNavigation}
              />
            </div>
          </div>

          <DesktopNavigation
            isShow={isTablet && isMobileNavigationVisible}
            menu={menu}
            showedMenu={showedMenu}
            findMenuToShow={(menu) => findMenuToShow(menu)}
          />

          <NavigationMenu menu={showedMenu} />
        </div>
      )}
    </div>
  )
}
