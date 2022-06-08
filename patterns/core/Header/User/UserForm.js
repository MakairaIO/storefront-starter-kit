import { Button } from '../../..'
import { Form } from './LoginBox'
import { useState } from 'react'
import { useTranslation } from '../../../../utils'

const dummyLogoutUser = async (data) => {
  return new Promise((res) => setTimeout(() => res(data), 1000))
}

const UserForm = ({ user }) => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await dummyLogoutUser()
    setLoading(false)
  }

  return (
    <Form
      title={t('USER_WELCOME')(user.fullName)}
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
