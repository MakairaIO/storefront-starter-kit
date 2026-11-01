import { Button } from '../../..'
import { Form } from './LoginBox'
import { useState } from 'react'
import { useTranslation, useShopifyAuth } from '../../../../utils'

const UserForm = ({ user }) => {
  const { logout } = useShopifyAuth()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    logout()
    setLoading(false)
  }

  return (
    <Form
      title={t('USER_WELCOME')(`${user.firstname} ${user.lastname}`)}
      buttonVariant="primary-alt"
      buttonText={t('LOGOUT')}
      buttonIcon="logout"
      formId="login-box__logout"
      onSubmit={handleLogout}
      loading={loading}
    >
      <Button
        variant="secondary"
        icon="user"
        iconPosition="left"
        className="login-box__button"
        href="/my-account"
      >
        {t('USER_ACCOUNT')}
      </Button>
    </Form>
  )
}

export default UserForm
