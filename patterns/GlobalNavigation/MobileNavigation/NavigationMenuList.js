import React from 'react'
import { useTranslation } from '../../../utils'
import { Link, Text, Icon } from '../..'

export default function NavigationMenuList(props) {
  const { text, link, children = [] } = props
  const { language } = useTranslation()
  const subCategoryNumber = children.length
  const hasSubcategories = subCategoryNumber > 0

  return (
    <div className="navigation__menu__list">
      <div>
        {/*<Heading className="navigation__heading" size="charlie">
          <Link href={link[language]}>{text[language]}</Link>
        </Heading>*/}
        <Link key={123} href={link[language]}>
          <Text
            className="navigation__heading heading"
            element="p"
            size="charlie"
          >
            {text[language]}
          </Text>
        </Link>
        {hasSubcategories &&
          children.map((subCat) => {
            const { uuid, link, text, css = '' } = subCat
            const [icon, symbol] = css.split('-')

            return (
              <Link key={uuid} href={link[language]}>
                <Text
                  className="navigation__subheading"
                  element="p"
                  size="charlie"
                >
                  {icon === 'icon' && symbol && (
                    <Icon
                      className="navigation__subheading--icon"
                      symbol={symbol}
                    />
                  )}
                  {text[language]}
                </Text>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
