import { Form } from './LoginBox'
import { Button, FormInput, FormField, FormStatus } from '../../..'
import { useState } from 'react'
import { useTranslation } from '../../../../utils'
import { useShopClient } from '@makaira/storefront-react'

const PasswordForgotForm = ({ onBackToLogin }) => {
  const { t } = useTranslation()
  const { client } = useShopClient()

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)

    const { error } = await client.user.forgotPassword({
      input: { username: data.email },
    })

    setStatus(error ? 'error' : 'success')
    setLoading(false)
  }

  return (
    <Form
      title={t('LOGIN_FORGOT_PASSWORD_TITLE')}
      buttonText={t('LOGIN_FORGOT_PASSWORD_BUTTON')}
      formId="login-box__pw-reset-form"
      onSubmit={onSubmit}
      loading={loading}
      belowFormContent={
        <Button
          variant="secondary"
          icon="chevron-double-left"
          iconPosition="left"
          className="login-box__button"
          onClick={onBackToLogin}
        >
          {t('LOGIN_BACK_TO_LOGIN')}
        </Button>
      }
    >
      <FormStatus
        status={status}
        successMessage={t('LOGIN_FORGOT_PASSWORD_SUCCESS')}
        errorMessage={t('LOGIN_FORGOT_PASSWORD_ERROR')}
      />

      <FormField name="email" label={t('LOGIN_EMAIL_LABEL')} required>
        <FormInput type="email" autoComplete="username" />
      </FormField>
    </Form>
  )
}

export default PasswordForgotForm
