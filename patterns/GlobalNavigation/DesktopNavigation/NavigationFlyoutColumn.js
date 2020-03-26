import { useTranslation } from '../../../utils'
import { Icon, Link } from '../..'

export default function NavigationFlyoutColumn(props) {
  const { language } = useTranslation()
  const { text = {}, link = {}, children = [] } = props

  const hasSubcategories = children.length > 0

  return (
    <div className="desktop-navigation__flyout-column">
      <Link
        href={link[language]}
        className="desktop-navigation__flyout-column-header"
      >
        {text[language]}
      </Link>

      {hasSubcategories && (
        <ul className="desktop-navigation__flyout-column-list">
          {children.map((entry) => (
            // FIXME: Only show icon when entry has subcategories itself
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
