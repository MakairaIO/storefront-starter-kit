import { Overlay } from '..'

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="site-wrapper">{children}</div>

      <Overlay />
    </>
  )
}
