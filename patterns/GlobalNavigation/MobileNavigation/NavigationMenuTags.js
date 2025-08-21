import React from 'react'
import { useTranslation } from '../../../utils'
import { Link, Heading, Text } from '../..'

export default function NavigationMenuTags(props) {
  const { text, link, children = [] } = props
  const { language } = useTranslation()
  const hasSubcategories = children.length

  return (
    <div className="footer__tag-list">
      <Heading className="navigation__heading" size="charlie">
        <Link href={link[language]}>{text[language]}</Link>
      </Heading>
      <ul className="footer__tags">
        {hasSubcategories &&
          children.map((subCat) => {
            const { uuid, link, text } = subCat
            return (
              <Link key={uuid} href={link[language]}>
                <Text className="footer__tag" element="li" size="charlie">
                  {text[language]}
                </Text>
              </Link>
            )
          })}
      </ul>
      <Link>
        <Heading className="footer__heading__sub show-more-link" size="charlie">
          Themenübersicht ›
        </Heading>
      </Link>
    </div>
  )
}
