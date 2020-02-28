import { Icon } from '..'

function Header() {
  return (
    <header className="header">
      <Icon symbol="user" />
      <h1>Insert Header Here</h1>
    </header>
  )
}

export default Header
export { default as headerVariants } from './variants.js'
