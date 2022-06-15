import { Overlay, ModalRoot, BackToTop } from '../..'

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="site-wrapper">
        {children}

        <ModalRoot />
        <BackToTop />
      </div>

      <Overlay />
    </>
  )
}
