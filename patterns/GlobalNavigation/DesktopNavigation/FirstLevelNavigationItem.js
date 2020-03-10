import { useState } from 'react'
import { useTranslation } from '../../../utils'
import NavigationFlyout from './NavigationFlyout'

const TRANSITION_DELAY_IN_MS = 200

export default function FirstLevelNavigationItem(props) {
  const [isExpanded, toggleExpanded] = useState(false)
  const [timerId, setTimer] = useState(null)
  const { language } = useTranslation()
  const { text = {}, link = {}, children = [] } = props

  const hasSubcategories = children.length > 0

  return (
    <li
      className="desktop-navigation__item"
      onMouseEnter={() => {
        clearTimeout(timerId)

        setTimeout(() => toggleExpanded(true), TRANSITION_DELAY_IN_MS)
      }}
      onMouseLeave={() => {
        setTimer(
          setTimeout(() => {
            toggleExpanded(false)
          }, TRANSITION_DELAY_IN_MS)
        )
      }}
    >
      <a href={link[language]}>{text[language]}</a>

      <NavigationFlyout
        isVisible={hasSubcategories && isExpanded}
        subcategories={children}
      />
    </li>
  )
}
