import { Form } from './LoginBox'
import { useState } from 'react'
import { useTranslation, useShopifyAuth } from '../../../../utils'

const getWelcomeName = (user) => {
  const fullName = [user.firstname, user.lastname].filter(Boolean).join(' ')
  return fullName || user.email || ''
}

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
      title={t('USER_WELCOME')(getWelcomeName(user))}
      buttonVariant="primary-alt"
      buttonText={t('LOGOUT')}
      buttonIcon="logout"
      formId="login-box__logout"
      onSubmit={handleLogout}
      loading={loading}
    />
  )
}

export default UserForm
