import { Icon } from '../../patterns'
import icons from '../../config/icons'

export default function IconView() {
  return (
    <div className="pali__icons">
      {Object.entries(icons).map(([iconName, iconInfo]) => (
        <div key={iconName} className="pali__icon-container">
          <Icon symbol={iconInfo.value} />

          <div>
            <span className="pali__icon-title">{iconName}</span>
            <pre>
              <code>{`<Icon symbol={${iconInfo.value}} />`}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  )
}
