import MobileNavigation from './MobileNavigation'
import DesktopNavigation from './DesktopNavigation'

export default function GlobalNavigation(props) {
  const { renderMobileNavigation } = props

  if (renderMobileNavigation) {
    return <MobileNavigation {...props} />
  }

  return <DesktopNavigation {...props} />
}
