import {
  Overlay,
  ModalRoot,
  BackToTop,
  AddCartSuccessModal,
  UserIntent,
  DrawerRoot,
} from '../..'

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="site-wrapper">
        {children}

        <ModalRoot />
        <DrawerRoot />
        <AddCartSuccessModal />
        <BackToTop />
      </div>

      <UserIntent />
      <Overlay />
    </>
  )
}
