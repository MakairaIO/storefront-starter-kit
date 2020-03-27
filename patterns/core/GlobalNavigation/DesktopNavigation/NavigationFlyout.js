import NavigationFlyoutColumn from './NavigationFlyoutColumn'

export default function NavigationFlyout(props) {
  const { isVisible, subcategories = [] } = props

  if (!isVisible) return null

  return (
    <div className="desktop-navigation__flyout">
      {subcategories.map((entry) => (
        <NavigationFlyoutColumn key={entry.uuid} {...entry} />
      ))}
    </div>
  )
}
