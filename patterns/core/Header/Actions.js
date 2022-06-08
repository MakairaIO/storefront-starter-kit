import { Button, FormattedPrice } from '../..'
import { useTranslation } from '../../../utils'
import LoginBox from './User/LoginBox'

// TODO: Remove hard-coded implementation
export default function Actions(props) {
  const { toggleLoginBox, isLoginBoxVisible } = props

  const { t } = useTranslation()

  return (
    <>
      <div className="header__actions header__actions--mobile">
        <Button
          variant="icon-only"
          icon="user"
          className="header__action"
          onClick={toggleLoginBox}
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
          className="header__action"
          iconPosition="left"
          onClick={toggleLoginBox}
        >
          {t('HEADER_ACCOUNT_AREA')}
        </Button>

        <Button
          icon="cart"
          href="#todo"
          className="header__action"
          iconPosition="left"
        >
          <span className="header__basket-bubble">2</span>

          <FormattedPrice price="259.89" />
        </Button>
      </div>

      {isLoginBoxVisible && <LoginBox />}
    </>
  )
}
