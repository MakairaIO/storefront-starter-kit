import NavigationItem from './NavigationItem'

export default function SubcategoryList(props) {
  const { isVisible = false, subcategories = [] } = props

  if (!isVisible) return null

  return (
    <ul className="mobile-navigation__subcategories">
      {subcategories.map(entry => (
        <NavigationItem key={entry.uuid} {...entry} />
      ))}
    </ul>
  )
}
