import { useState } from 'react'
import componentConfig from '../../library/config'
import {
  MobileHeader,
  ColorView,
  TypographyView,
  IconView,
  ComponentView,
} from '../../library/internal'
import Head from 'next/head'

const mainComponents = {
  color: ColorView,
  typography: TypographyView,
  icon: IconView,
  component: ComponentView,
}

function NavigationList({ entries, visibleEntry, setVisibleEntry }) {
  return (
    <>
      {entries.map((entry) => {
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
    </>
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

export default function Index() {
  const [isNavigationVisible, toggleNavigation] = useState(false)

  const [visibleEntry, setVisibleEntry] = useState({
    type: '',
    entry: {},
  })

  const MainComponent = mainComponents[visibleEntry.type]

  const navigationClasses =
    'pali__nav' + (isNavigationVisible ? ' pali__nav--visible' : '')

  function handleNavigationClick(entry) {
    toggleNavigation(false)
    setVisibleEntry(entry)
  }

  const pages = componentConfig.filter((entry) => entry.type === 'page')
  const placeables = componentConfig.filter(
    (entry) => entry.type === 'placeable'
  )
  const statics = componentConfig.filter((entry) => entry.type === 'static')
  const atomsAndMolecules = componentConfig.filter(
    (entry) =>
      entry.type === 'atom' ||
      entry.type === 'molecule' ||
      entry.type === 'component' // catch 'component' type here for backwards compatibility
  )

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/library/library.css" />
      </Head>
      <div className="pali__wrapper">
        <MobileHeader
          isNavigationVisible={isNavigationVisible}
          toggleNavigation={toggleNavigation}
          visibleEntry={visibleEntry}
        />

        <nav className={navigationClasses}>
          <figure className="pali__home-icon">
            <img src="/assets/library/makaira-logo.png" alt="logo" />
          </figure>

          <ul className="pali__list">
            <li className="pali__list-item pali__list-header">Example Pages</li>

            <NavigationList
              entries={pages}
              visibleEntry={visibleEntry}
              setVisibleEntry={handleNavigationClick}
            />

            <li className="pali__list-item pali__list-header">
              Placeable Components
            </li>

            <NavigationList
              entries={placeables}
              visibleEntry={visibleEntry}
              setVisibleEntry={handleNavigationClick}
            />

            <li className="pali__list-item pali__list-header">
              Static Components
            </li>

            <NavigationList
              entries={statics}
              visibleEntry={visibleEntry}
              setVisibleEntry={handleNavigationClick}
            />

            <li className="pali__list-item pali__list-header">
              Atoms & Molecules
            </li>

            <NavigationList
              entries={atomsAndMolecules}
              visibleEntry={visibleEntry}
              setVisibleEntry={handleNavigationClick}
            />

            <li className="pali__list-item pali__list-header">Basics</li>

            <NavigationEntryBasic
              label="Colors"
              type="color"
              visibleEntry={visibleEntry}
              setVisibleEntry={handleNavigationClick}
            />

            <NavigationEntryBasic
              label="Typography"
              type="typography"
              visibleEntry={visibleEntry}
              setVisibleEntry={handleNavigationClick}
            />

            <NavigationEntryBasic
              label="Icons"
              type="icon"
              visibleEntry={visibleEntry}
              setVisibleEntry={handleNavigationClick}
            />
          </ul>
        </nav>

        <main className="pali__main">
          {visibleEntry.type != '' && (
            <MainComponent
              {...visibleEntry.entry}
              type={visibleEntry.entry.type}
            />
          )}
        </main>
      </div>
    </>
  )
}
