import { Icon } from '../..'

export default function ExpandIcon(props) {
  const {
    isVisible = false,
    isExpanded = false,
    isMainCategory = false,
  } = props

  if (!isVisible) return null

  if (!isMainCategory) {
    if (isExpanded) {
      return (
        <Icon
          symbol="chevron-down"
          className="mobile-navigation__expand-icon"
        />
      )
    }

    return (
      <Icon symbol="chevron-right" className="mobile-navigation__expand-icon" />
    )
  }

  if (isExpanded) {
    return (
      <Icon symbol="chevron-up" className="mobile-navigation__expand-icon" />
    )
  }

  return (
    <Icon symbol="chevron-down" className="mobile-navigation__expand-icon" />
  )
}
