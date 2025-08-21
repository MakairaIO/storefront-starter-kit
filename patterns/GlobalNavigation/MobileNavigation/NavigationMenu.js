import NavigationMenuList from './NavigationMenuList'

export default function NavigationMenu(props) {
  const { menu = {} } = props
  const { children = [] } = menu

  if (children.length === 0) {
    return null
  }

  return (
    <div className="navigation__menu__wrapper">
      <div className="navigation__menu">
        {children.map((category) => {
          const { uuid } = category
          return <NavigationMenuList key={uuid} {...category} />
        })}
      </div>
    </div>
  )
}
