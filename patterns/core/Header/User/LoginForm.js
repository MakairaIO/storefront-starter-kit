import { useState } from 'react'

import { Form } from './LoginBox'
import { FormField, FormInput, FormStatus, Button } from '../../..'
import { useTranslation } from '../../../../utils'

const dummyLoginUser = async (data) => {
  return new Promise((res) => setTimeout(() => res(data), 1000))
}

const LoginForm = ({ onPasswordForgetSwitch }) => {
  const { t } = useTranslation()

  const [formStatus, setFormStatus] = useState('')
  const [isFormLoading, setFormLoading] = useState(false)

  const onSubmit = async (data) => {
    setFormLoading(true)

    const success = await dummyLoginUser(data)

    setFormStatus(success ? 'success' : 'error')
    setFormLoading(false)
  }

  return (
    <Form
      title={t('LOGIN_TITLE')}
      buttonText={t('LOGIN_BUTTON')}
      formId="login-box__form"
      onSubmit={onSubmit}
      loading={isFormLoading}
      belowFormContent={
        <div className="login-box__forgot-password">
          <Button onClick={onPasswordForgetSwitch} variant="link">
            {t('LOGIN_FORGOT_PASSWORD')}
          </Button>
        </div>
      }
    >
      <FormStatus errorMessage={t('LOGIN_ERROR')} status={formStatus} />

      <FormField name="email" label="E-Mail-Adresse" required>
        <FormInput type="email" autoComplete="username" />
      </FormField>
      <FormField name="password" label="Passwort" required>
        <FormInput type="password" autoComplete="current-password" />
      </FormField>
    </Form>
  )
}

export default LoginForm
