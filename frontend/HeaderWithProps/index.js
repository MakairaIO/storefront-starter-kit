import { Header } from '../../patterns'
import { useGlobalData } from '../../utils'

export default function HeaderWithProps(props) {
  const { menuData } = useGlobalData()

  const headerProps = {
    ...props,
    menu: menuData,
  }

  return <Header {...headerProps} />
}
