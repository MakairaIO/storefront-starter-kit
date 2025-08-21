import { Overlay, ModalRoot } from '../..'

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="site-wrapper">
        <div className="bg-svg" />
        {children}

        <ModalRoot />
      </div>

      <Overlay />
    </>
  )
}
