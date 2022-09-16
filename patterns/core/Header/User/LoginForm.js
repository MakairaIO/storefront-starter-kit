import { useState } from 'react'

import { Form } from './LoginBox'
import { FormField, FormInput, FormStatus, Button } from '../../..'
import { useTranslation } from '../../../../utils'
import { useShopClient } from '@makaira/storefront-react'

const LoginForm = ({ onPasswordForgetSwitch }) => {
  const { t } = useTranslation()
  const { client } = useShopClient()

  const [formStatus, setFormStatus] = useState('')
  const [isFormLoading, setFormLoading] = useState(false)

  const onSubmit = async (data) => {
    setFormLoading(true)

    const { error } = await client.user.login({
      input: { username: data.email, password: data.password },
    })

    setFormStatus(error ? 'error' : 'success')
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
      <FormStatus
        successMessage={t('LOGIN_SUCCESS')}
        errorMessage={t('LOGIN_ERROR')}
        status={formStatus}
      />

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
