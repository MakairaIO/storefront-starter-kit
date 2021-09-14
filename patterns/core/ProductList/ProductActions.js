import { Button } from '../..'
import { useTranslation } from '../../../utils'

export default function ProductActions(props) {
  const { id, isBundle = false, addToBundle = () => {}, bundles = [] } = props
  const { t } = useTranslation()

  function onClickAddToBundle(event) {
    event.preventDefault()

    addToBundle(id)
  }

  return (
    <div className="product-item__actions">
      {!isBundle && (
        <Button variant="primary">{t('PRODUCT_TILE_ADD_TO_CART')}</Button>
      )}

      {(isBundle || bundles.length > 0) && (
        <Button variant="primary" onClick={onClickAddToBundle}>
          {t('PRODUCT_TILE_ADD_TO_BUNDLE')}
        </Button>
      )}
    </div>
  )
}
