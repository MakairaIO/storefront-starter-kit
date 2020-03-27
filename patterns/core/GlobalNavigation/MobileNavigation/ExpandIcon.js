import { Icon } from '../../..'

export default function ExpandIcon(props) {
  const { isVisible = false, isExpanded = false } = props

  if (!isVisible) return null

  if (isExpanded) {
    return <Icon symbol="minus" className="mobile-navigation__expand-icon" />
  }

  return <Icon symbol="plus" className="mobile-navigation__expand-icon" />
}
