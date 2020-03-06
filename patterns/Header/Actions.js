import { Button } from '..'

// TODO: Translations
// TODO: format prices via helper-function
// TODO: Remove hard-coded implementation
export default function Actions() {
  return (
    <>
      <div className="header__actions header__actions--mobile">
        <Button icon="user" href="#todo" className="header__action" />

        <Button icon="cart" href="#todo" className="header__action" />
      </div>

      <div className="header__actions header__actions--desktop">
        <Button
          icon="user"
          href="#todo"
          className="header__action"
          iconPosition="left"
        >
          Mein Konto
        </Button>

        <Button
          icon="cart"
          href="#todo"
          className="header__action"
          iconPosition="left"
        >
          <span className="header__basket-bubble">2</span>
          259,80 €
        </Button>
      </div>
    </>
  )
}
