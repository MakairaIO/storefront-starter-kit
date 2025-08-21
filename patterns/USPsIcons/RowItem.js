import classname from 'classnames'

import { Icon, Heading } from '..'

function RowItem(props) {
  const { text, icon = {} } = props
  const { isVisible, symbol } = icon
  const textClass = classname('usps-icon__row-content')
  const iconClass = classname('usps-icon__row-icon')

  return (
    <div className="usps-icon__row">
      <aside className="usps-icon__icon-wrapper">
        {isVisible && symbol && <Icon symbol={symbol} className={iconClass} />}
      </aside>
      <div className={textClass}>
        <Heading level={5} size="charlie">
          {text}
        </Heading>
      </div>
    </div>
  )
}

export default RowItem
