import { Button, FormattedPrice } from '..'
import { useTranslation } from '../../utils'

// TODO: Remove hard-coded implementation
export default function Actions(props) {
  const { t } = useTranslation()
  const { cart = {} } = props
  const { totalItemCount = 0, total = 0 } = cart

  return (
    <>
      <div className="header__actions header__actions--mobile">
        <Button
          variant="icon-only"
          icon="user"
          href="#todo"
          className="header__action"
        />

        <Button
          variant="icon-only"
          icon="cart"
          href="#todo"
          className="header__action"
        />
      </div>

      <div className="header__actions header__actions--desktop">
        <Button
          icon="user"
          href="#todo"
          className="header__action"
          iconPosition="left"
        >
          {t('HEADER_ACCOUNT_AREA')}
        </Button>

        <Button
          icon="cart"
          href="/basket"
          className="header__action"
          iconPosition="left"
        >
          {totalItemCount > 0 ? (
            <span className="header__basket-bubble">{totalItemCount}</span>
          ) : null}

          <FormattedPrice price={total} />
        </Button>
      </div>
    </>
  )
}
