import { useTranslation } from '../../../utils'
import { Icon } from '../..'

export default function NavigationFlyoutColumn(props) {
  const { language } = useTranslation()
  const { text = {}, link = {}, children = [] } = props

  const hasSubcategories = children.length > 0

  return (
    <div className="desktop-navigation__flyout-column">
      <a
        href={link[language]}
        className="desktop-navigation__flyout-column-header"
      >
        {text[language]}
      </a>

      {hasSubcategories && (
        <ul className="desktop-navigation__flyout-column-list">
          {children.map(entry => (
            // FIXME: Only show icon when entry has subcategories itself
            <li key={entry.uuid}>
              <a href={entry['link'][language]}>
                {entry['text'][language]}

                <Icon symbol="chevron-right" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
