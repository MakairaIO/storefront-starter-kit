import Icon from '../Icon'
import Text from '../Text'

import { useGlobalData, useTranslation } from '../../../utils'

const NoComponent = ({ name = '' }) => {
  const { t } = useTranslation()
  const { isPreview = false } = useGlobalData()

  if (!isPreview) return null

  return (
    <div className="no-component">
      <div className="no-component__inner">
        <Icon symbol="construction" />
        <div className="no-component__content">
          <Text className="no-component__name">{name}</Text>
          <Text className="no-component__description">
            {t('NO_COMPONENT_AVAILABLE')}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default NoComponent
