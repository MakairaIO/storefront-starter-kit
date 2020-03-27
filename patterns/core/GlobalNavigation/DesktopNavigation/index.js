import FirstLevelNavigationItem from './FirstLevelNavigationItem'

export default function DesktopNavigation(props) {
  const { menu = [] } = props

  return (
    <nav className="desktop-navigation__wrapper">
      <ul className="desktop-navigation">
        {menu.map((entry) => (
          <FirstLevelNavigationItem key={entry.uuid} {...entry} />
        ))}
      </ul>
    </nav>
  )
}
