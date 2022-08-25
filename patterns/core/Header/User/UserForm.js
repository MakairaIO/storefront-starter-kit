import { Button } from '../../..'
import { Form } from './LoginBox'
import { useState } from 'react'
import { useTranslation } from '../../../../utils'
import { useShopClient } from '@makaira/storefront-react'

const UserForm = ({ user }) => {
  const { client } = useShopClient()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await client.user.logout({ input: {} })
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
