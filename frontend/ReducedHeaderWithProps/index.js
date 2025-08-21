import { Header } from '../../patterns'

export default function ReducedHeaderWithProps(props) {
  let menuData = props.menu || []

  if (menuData.slice(-1)[0]) {
    menuData[menuData.length - 1].css = 'sign_up'
  }

  const headerProps = {
    ...props,
    menu: menuData,
  }

  return <Header {...headerProps} />
}
