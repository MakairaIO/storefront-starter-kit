import classNames from 'classnames'
import { Button, Icon } from '../..'
import NavigationItem from './NavigationItem'
import InfoLinks from './InfoLinks'

// TODO: Translations
export default function MobileNavigation(props) {
  const {
    menu = [],
    isMobileNavigationVisible = false,
    toggleMobileNavigation,
  } = props

  const flyoutClasses = classNames('mobile-navigation__flyout', {
    'mobile-navigation__flyout--visible': isMobileNavigationVisible,
  })

  return (
    <div className={flyoutClasses}>
      <div className="mobile-navigation__header">
        <Button icon="times" onClick={toggleMobileNavigation} />

        <label className="mobile-navigation__search">
          <Icon symbol="search" />

          <input
            type="text"
            name=""
            // value=""
            required="required"
            className="mobile-navgation__search-input"
          />
        </label>
      </div>

      <nav className="mobile-navigation" arial-label="Primary Navigation">
        <ul>
          {menu.map(entry => (
            <NavigationItem key={entry.uuid} {...entry} isMainCategory={true} />
          ))}
        </ul>
      </nav>

      <InfoLinks />
    </div>
  )
}
