import { useTranslation } from '../../../../utils'
import { Icon, Link, ConditionalLink } from '../../..'

export default function NavigationFlyoutColumn(props) {
  const { language } = useTranslation()
  const { text = {}, link = {}, children = [] } = props

  const hasSubcategories = children.length > 0

  return (
    <div className="desktop-navigation__flyout-column">
      <ConditionalLink
        href={link[language]}
        className="desktop-navigation__flyout-column-header"
        fallbackElement="span"
      >
        {text[language]}
      </ConditionalLink>

      {hasSubcategories && (
        <ul className="desktop-navigation__flyout-column-list">
          {children.map((entry) => (
            <li key={entry.uuid}>
              <Link href={entry['link'][language]}>
                <span>{entry['text'][language]}</span>

                <Icon symbol="chevron-right" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
