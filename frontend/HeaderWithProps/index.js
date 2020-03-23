import { Header } from '../../patterns'
import { useGlobalData } from '../../utils'

export default function HeaderWithProps() {
  const { menuData } = useGlobalData()

  return <Header menu={menuData} />
}
