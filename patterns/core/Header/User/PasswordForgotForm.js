import { Form } from './LoginBox'
import { Button, FormInput, FormField, FormStatus } from '../../..'
import { useState } from 'react'
import { useTranslation } from '../../../../utils'

const dummyResetPassword = async (data) => {
  return new Promise((res) => setTimeout(() => res(data), 1000))
}

const PasswordForgotForm = ({ onBackToLogin }) => {
  const { t } = useTranslation()

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)

    const success = await dummyResetPassword(data)

    setStatus(success ? 'success' : 'error')
    setLoading(false)
  }

  return (
    <Form
      title={t('LOGIN_FORGOT_PASSWORD_TITLE')}
      buttonVariant="primary-alt"
      buttonText={t('LOGIN_FORGOT_PASSWORD_BUTTON')}
      formId="login-box__pw-reset-form"
      onSubmit={onSubmit}
      loading={loading}
    >
      <FormStatus
        status={status}
        successMessage={t('LOGIN_FORGOT_PASSWORD_SUCCESS')}
        errorMessage={t('LOGIN_FORGOT_PASSWORD_ERROR')}
      />

      <FormField name="email" label={t('LOGIN_EMAIL_LABEL')} required>
        <FormInput type="email" />
      </FormField>

      <Button
        variant="secondary"
        icon="chevron-double-left"
        iconPosition="left"
        className="login-box__button"
        onClick={onBackToLogin}
      >
        {t('LOGIN_BACK_TO_LOGIN')}
      </Button>
    </Form>
  )
}

export default PasswordForgotForm
