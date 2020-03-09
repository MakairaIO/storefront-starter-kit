import MobileNavigation from './MobileNavigation'

export default function GlobalNavigation(props) {
  const {
    renderMobileNavigation,
    isMobileNavigationVisible,
    toggleMobileNavigation,
  } = props

  if (renderMobileNavigation) {
    return (
      <MobileNavigation
        {...props}
        isVisible={isMobileNavigationVisible}
        closeFlyout={toggleMobileNavigation}
      />
    )
  }

  return null
}
