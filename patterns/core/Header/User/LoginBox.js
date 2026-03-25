import React from 'react'

import UserForm from './UserForm'
import LoginForm from './LoginForm'
import { Button, Text } from '../../..'

import FlyoutBox from '../FlyoutBox'
import { useShopifyAuth } from '../../../../utils'

const Form = ({
  title,
  buttonIcon = '',
  buttonText,
  buttonVariant = 'primary',
  children,
  formId,
  onSubmit = () => {},
  loading = false,
  belowFormContent,
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
    <FlyoutBox>
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
        {belowFormContent}
      </form>
    </FlyoutBox>
  )
}

const LoginBox = () => {
  const { user, isAuthenticated } = useShopifyAuth()

  if (isAuthenticated && user) {
    return <UserForm user={user} />
  }

  return <LoginForm />
}

export default LoginBox
export { Form }
