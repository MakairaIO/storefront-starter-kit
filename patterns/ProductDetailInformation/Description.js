import { Heading, Copytext } from '..'
import { useTranslation } from '../../utils'

export default function Description(props) {
  const { t } = useTranslation()
  const { longdesc } = props

  return (
    <div className="product-detail-information__description">
      <Heading size="125">{t('PRODUCT_DETAIL_DESCRIPTION_TITLE')}</Heading>

      <Copytext>{longdesc}</Copytext>
    </div>
  )
}
