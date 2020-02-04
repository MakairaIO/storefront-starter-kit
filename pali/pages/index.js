import { Fragment, useState } from 'react'
import { Image } from '../components'
import { default as componentConfig } from '../components/config.js'
import ColorView from '../pattern-library/ColorView'
import TypographyView from '../pattern-library/TypographyView'
import IconView from '../pattern-library/IconView'
import ComponentView from '../pattern-library/ComponentView'

const mainComponents = {
  color: ColorView,
  typography: TypographyView,
  icon: IconView,
  component: ComponentView,
}

function NavigationList({ entries, visibleEntry, setVisibleEntry }) {
  return (
    <Fragment>
      {entries.map(entry => {
        const isActive = entry.name === visibleEntry.entry.name
        const listItemClasses =
          'pali__list-item' + (isActive ? ' pali__list-item--active' : '')

        return (
          <li // eslint-disable-line
            key={entry.name}
            className={listItemClasses}
            onClick={() => setVisibleEntry({ type: 'component', entry })}
          >
            {entry.name}
          </li>
        )
      })}
    </Fragment>
  )
}

function NavigationEntryBasic({ type, label, visibleEntry, setVisibleEntry }) {
  return (
    <li // eslint-disable-line
      className={`pali__list-item ${
        visibleEntry.type === type ? 'pali__list-item--active' : ''
      }`}
      onClick={() => setVisibleEntry({ type, entry: {} })}
    >
      {label}
    </li>
  )
}

export default function Index(props) {
  const [visibleEntry, setVisibleEntry] = useState({
    type: 'color',
    entry: {},
  })

  const components = componentConfig.filter(entry => entry.type === 'component')
  const pages = componentConfig.filter(entry => entry.type === 'page')

  const MainComponent = mainComponents[visibleEntry.type]

  return (
    <div className="pali__wrapper">
      <nav className="pali__nav">
        <figure className="pali__home-icon">
          <img src="/static/pattern-library/makaira-logo.png" alt="logo" />
        </figure>

        <ul className="pali__list">
          <li className="pali__list-item pali__list-header">Basics</li>

          <NavigationEntryBasic
            label="Colors"
            type="color"
            visibleEntry={visibleEntry}
            setVisibleEntry={setVisibleEntry}
          />

          <NavigationEntryBasic
            label="Typography"
            type="typography"
            visibleEntry={visibleEntry}
            setVisibleEntry={setVisibleEntry}
          />

          <NavigationEntryBasic
            label="Icons"
            type="icon"
            visibleEntry={visibleEntry}
            setVisibleEntry={setVisibleEntry}
          />

          <li className="pali__list-item pali__list-header">Components</li>

          <NavigationList
            entries={components}
            visibleEntry={visibleEntry}
            setVisibleEntry={setVisibleEntry}
          />

          <li className="pali__list-item pali__list-header">Pages</li>

          <NavigationList
            entries={pages}
            visibleEntry={visibleEntry}
            setVisibleEntry={setVisibleEntry}
          />
        </ul>
      </nav>

      <main className="pali__main">
        <MainComponent {...visibleEntry.entry} type={visibleEntry.entry.type} />
      </main>
    </div>
  )
}
