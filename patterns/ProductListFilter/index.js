import MobileFilter from './MobileFilter'
import DesktopFilter from './DesktopFilter'

export default function ProductListFilter(props) {
  return <DesktopFilter {...props} />
  // return <MobileFilter {...props} />
}
