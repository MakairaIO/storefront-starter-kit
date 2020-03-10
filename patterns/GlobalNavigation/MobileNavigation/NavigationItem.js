import { useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from '../../../utils'
import ExpandIcon from './ExpandIcon'
import SubcategoryList from './SubcategoryList'

export default function NavigationItem(props) {
  const [isExpanded, toggleExpanded] = useState(false)
  const { language } = useTranslation()
  const {
    text = {},
    link = {},
    children = [],
    isMainCategory = false,
    className = '',
  } = props

  const hasSubcategories = children.length > 0

  function handleClick(event) {
    if (hasSubcategories) {
      event.preventDefault()
      toggleExpanded(!isExpanded)
    }
  }

  const itemClasses = classNames(className, 'mobile-navigation__item', {
    'mobile-navigation__item--main': isMainCategory,
    'mobile-navigation__item--no-subcats': !hasSubcategories,
    'mobile-navigation__item--expanded': isExpanded,
  })

  return (
    <>
      <li className={itemClasses}>
        <a
          href={link[language]}
          onClick={handleClick}
          className="mobile-navigation__link"
        >
          <ExpandIcon
            isVisible={hasSubcategories && isMainCategory}
            isExpanded={isExpanded}
          />

          {text[language]}

          <ExpandIcon
            isVisible={hasSubcategories && !isMainCategory}
            isExpanded={isExpanded}
          />
        </a>
      </li>

      <SubcategoryList
        isVisible={hasSubcategories && isExpanded}
        subcategories={children}
      />
    </>
  )
}