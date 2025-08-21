import { useState } from 'react'
import Icon from '../core/Icon'

const EcommerceOneBdge = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <div className="ecommerce-one-badge-wrapper">
      {isNavOpen && (
        <button onClick={() => setIsNavOpen(false)} className="bdrop"></button>
      )}
      <div className="ecommerce-one-badge-title">
        <a href="https://ecommerceone.de/" target="_blank" rel="referrer">
          <span>Ein Unternehmen der</span>
          <span className="bold">ECOMMERCE ONE</span>
        </a>
      </div>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className={`dd ${isNavOpen && 'dd-active'}`}
      >
        <Icon className="dd-icon" symbol="caret-down-solid" />
      </button>
      {isNavOpen && <Menu />}
      <div className="ecommerce-one-badge-contact">
        <Icon className="dd-icon" symbol="headset" />
        <p>+49 (0)621 / 8775226 - 0</p>
      </div>
    </div>
  )
}

export default EcommerceOneBdge

const Menu = () => {
  return (
    <div className="menu-wrapper">
      <ul className="nav-items">
        {navItems.map((item, i) => (
          <li
            className={`${item.label == 'Makaira' ? 'item-selected' : ''}`}
            key={i}
          >
            <a
              href={item.label == 'Makaira' ? '#' : item.target}
              target={item.label == 'Makaira' ? '' : '_blank'}
            >
              <span>{item.label}</span>
              <Icon symbol="external-link-alt" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const navItems = [
  { label: 'Afterbuy', target: 'https://www.afterbuy.de/' },
  { label: 'Baygraph', target: 'https://baygraph.de/' },
  { label: 'DreamRobot', target: 'https://www.dreamrobot.de/info/' },
  { label: 'Gambio', target: 'https://www.gambio.de/' },
  { label: 'Makaira', target: '#' },
  { label: 'Marmalade', target: 'https://www.marmalade.de/' },
]
