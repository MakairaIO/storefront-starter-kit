import { Overlay, ModalRoot, BackToTop, AddCartSuccessModal } from '../..'

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="site-wrapper">
        {children}

        <ModalRoot />
        <AddCartSuccessModal />
        <BackToTop />
      </div>

      <Overlay />
    </>
  )
}
