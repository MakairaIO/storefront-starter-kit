import classNames from 'classnames'
import { Button, Icon } from '../../..'
import NavigationItem from './NavigationItem'
import InfoLinks from './InfoLinks'
import LanguageSwitch from '../../Header/LanguageSwitch'

export default function MobileNavigation(props) {
  const {
    menu = [],
    isMobileNavigationVisible = false,
    hideMobileNavigation,
    mobileSearchInputRef,
    searchPhrase,
    changeSearchPhrase,
    submitForm,
  } = props

  const flyoutClasses = classNames('mobile-navigation__flyout', {
    'mobile-navigation__flyout--visible': isMobileNavigationVisible,
  })

  return (
    <div className={flyoutClasses}>
      <div className="mobile-navigation__header">
        <Button
          variant="icon-only"
          icon="times"
          onClick={hideMobileNavigation}
        />

        <form className="mobile-navigation__search" onSubmit={submitForm}>
          <label>
            <Icon symbol="search" />

            <input
              type="text"
              name="searchPhraseMobile"
              value={searchPhrase}
              onChange={changeSearchPhrase}
              required="required"
              className="mobile-navgation__search-input"
              ref={mobileSearchInputRef}
            />
          </label>
        </form>

        <LanguageSwitch />
      </div>

      <nav className="mobile-navigation" arial-label="Primary Navigation">
        <ul>
          {menu.map((entry) => (
            <NavigationItem key={entry.uuid} {...entry} isMainCategory={true} />
          ))}
        </ul>
      </nav>

      <InfoLinks />
    </div>
  )
}
