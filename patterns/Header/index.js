import { Button } from '..'
import InfoLinks from './InfoLinks'
import Search from './Search'
import Actions from './Actions'

function Header() {
  return (
    <header className="header">
      <Button icon="bars" className="header__menu-button" />

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
  )
}

export default Header
export { default as headerVariants } from './variants.js'
