import { Overlay, ModalRoot } from '../..'

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="site-wrapper">
        {children}

        <ModalRoot />
      </div>

      <Overlay />
    </>
  )
}
