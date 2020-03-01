import { MenuIcon, CloseIcon } from './'

const TITLE_BY_TYPE = {
  color: 'Colors',
  typography: 'Typography',
  icon: 'Icons',
}

export default function MobileHeader({
  isNavigationVisible,
  toggleNavigation,
  visibleEntry,
}) {
  let title = ''

  if (visibleEntry.type === 'component') {
    title = visibleEntry.entry.name
  } else {
    title = TITLE_BY_TYPE[visibleEntry.type]
  }

  return (
    <header className="pali__mobile-header">
      <button
        type="button"
        onClick={() => toggleNavigation(!isNavigationVisible)}
      >
        {isNavigationVisible ? <CloseIcon /> : <MenuIcon />}
      </button>

      <span>{title}</span>
    </header>
  )
}
