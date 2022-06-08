import React, { useState } from 'react'

import UserForm from './UserForm'
import LoginForm from './LoginForm'
import PasswordForgotForm from './PasswordForgotForm'
import { Button, Text } from '../../..'

import { useGlobalData } from '../../../../utils'

const Form = ({
  title,
  buttonIcon = '',
  buttonText,
  buttonVariant = 'primary',
  children,
  formId,
  onSubmit = () => {},
  loading = false,
}) => {
  const handleSubmit = (event) => {
    const formData = new FormData(event.target)
    const data = {}
    formData.forEach((value, key) => (data[key] = value))

    onSubmit(data)

    event.preventDefault()
    return false
  }

  return (
    <div className="login-box">
      <Text className="login-box__title" element="p" size="cupid">
        {title}
      </Text>

      <form id={formId} onSubmit={handleSubmit}>
        {children}

        <Button
          type="submit"
          variant={buttonVariant}
          className="login-box__button"
          loading={loading}
          iconPosition="left"
          icon={buttonIcon}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  )
}

const LoginBox = () => {
  const { user } = useGlobalData()

  const [showPasswordForgot, setShowPasswordForgot] = useState(false)

  const handlePasswordForgetSwitch = () => {
    setShowPasswordForgot(true)
  }

  const handleBackToLogin = () => {
    setShowPasswordForgot(false)
  }

  if (user) {
    return <UserForm user={user} />
  }

  if (showPasswordForgot) {
    return <PasswordForgotForm onBackToLogin={handleBackToLogin} />
  }

  return <LoginForm onPasswordForgetSwitch={handlePasswordForgetSwitch} />
}

export default LoginBox
export { Form }
