import MobileFilter from './MobileFilter'
import DesktopFilter from './DesktopFilter'

export default function ProductListFilter(props) {
  return (
    <>
      <MobileFilter {...props} />
      <DesktopFilter {...props} />
    </>
  )
}
