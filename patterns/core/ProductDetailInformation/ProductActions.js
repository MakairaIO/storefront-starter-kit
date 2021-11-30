import { Button, Dropdown } from '../..'
import { useTranslation } from '../../../utils'

// TODO: Add functionality (add-to-wishlist, add-to-cart etc.)
export default function ProductActions(props) {
  const { bundles, addToBundle, addToCart, loading } = props
  const { t } = useTranslation()

  const quantities = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ]

  return (
    <div className="product-detail-information__actions">
      <Button
        icon="heart"
        className="product-detail-information__wishlist"
        variant="icon-only"
      />

      <Dropdown
        id="sizeVariant"
        options={quantities}
        onChange={() => console.log('todo')}
        className="product-detail-information__quantity-select"
      />

      <Button
        variant="primary-alt"
        icon="cart"
        iconPosition="left"
        loading={loading}
        disabled={loading}
        onClick={addToCart}
        className="product-detail-information__add-cart"
      >
        {t('PRODUCT_DETAIL_ADD_TO_CART')}
      </Button>

      {bundles && bundles.length ? (
        <Button
          variant="primary"
          className="product-detail-information__add-bundle"
          onClick={addToBundle}
        >
          {t('PRODUCT_DETAIL_ADD_TO_BUNDLE')}
        </Button>
      ) : null}
    </div>
  )
}
