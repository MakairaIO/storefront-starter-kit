import { Button, Text } from '../../..'
import { useTranslation, useShopifyAuth } from '../../../../utils'
import FlyoutBox from '../FlyoutBox'

const LoginForm = () => {
  const { t } = useTranslation()
  const { login } = useShopifyAuth()

  const handleLogin = async () => {
    await login()
  }

  return (
    <FlyoutBox>
      <Text className="login-box__title" element="p" size="cupid">
        {t('LOGIN_TITLE')}
      </Text>

      <Button
        variant="primary"
        className="login-box__button"
        onClick={handleLogin}
      >
        {t('LOGIN_BUTTON')}
      </Button>
    </FlyoutBox>
  )
}

export default LoginForm
