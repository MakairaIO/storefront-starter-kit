import { useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from '../../../utils'
import { ConditionalLink, Icon, Button } from '../..'
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
    css = '',
    hideMobileNavigation,
  } = props

  const hasSubcategories = children.length > 0

  function handleClick(event) {
    if (hasSubcategories) {
      event.preventDefault()
      toggleExpanded(!isExpanded)
    } else {
      hideMobileNavigation()
    }
  }

  const itemClasses = classNames(className, 'mobile-navigation__item', {
    'mobile-navigation__item--main': isMainCategory,
    'mobile-navigation__item--no-subcats': !hasSubcategories,
    'mobile-navigation__item--expanded': isExpanded,
  })

  const [icon, symbol] = css.split('-')

  return (
    <>
      <li className={itemClasses}>
        {css === 'sign_up' && (
          <Button
            href={link[language]}
            fallbackElement="span"
            variant="primary"
            iconPosition="left"
            onClick={hideMobileNavigation}
            className="hs-cta-trigger-button hs-cta-trigger-button-75343025873"
          >
            {text[language]}
          </Button>
        )}
        {css !== 'sign_up' && (
          <ConditionalLink
            href={link[language]}
            onClick={handleClick}
            className="mobile-navigation__link"
            fallbackElement="span"
          >
            <ExpandIcon
              isMainCategory={isMainCategory}
              isVisible={hasSubcategories && !isMainCategory}
              isExpanded={isExpanded}
            />

            {icon === 'icon' && symbol && (
              <Icon className="mobile-navigation__item--icon" symbol={symbol} />
            )}

            {text[language]}

            <ExpandIcon
              isMainCategory={isMainCategory}
              isVisible={hasSubcategories && isMainCategory}
              isExpanded={isExpanded}
            />
          </ConditionalLink>
        )}
      </li>

      {hasSubcategories && link[language] !== '' && (
        <SubcategoryList
          isVisible={isExpanded}
          subcategories={[
            {
              text: text,
              link: link,
              uuid: `${text[language]}-${link[language]}`,
            },
          ]}
          parent={{ link, shouldRender: !!link[language] }}
        />
      )}

      <SubcategoryList
        isVisible={hasSubcategories && isExpanded}
        subcategories={children}
        parent={{ link, shouldRender: !!link[language] }}
      />
    </>
  )
}
