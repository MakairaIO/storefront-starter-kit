import FirstLevelNavigationItem from './FirstLevelNavigationItem'

export default function DesktopNavigation(props) {
  const {
    menu = [],
    showMobileNavigation = () => {},
    findMenuToShow = () => {},
    showedMenu = {},
    isShow,
  } = props

  return (
    <nav className={`desktop-navigation__wrapper ${!isShow ? 'hidden' : ''}`}>
      <ul className="desktop-navigation">
        {menu.map((entry) => (
          <FirstLevelNavigationItem
            key={entry.uuid}
            {...entry}
            showMobileNavigation={showMobileNavigation}
            findMenuToShow={findMenuToShow}
            showedMenu={showedMenu}
          />
        ))}
      </ul>
    </nav>
  )
}
