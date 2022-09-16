import { Text, Button } from '../../../index'
import ProductList from './ProductList'
import { useShopClient, useShopWishlist } from '@makaira/storefront-react'
import FlyoutBox from '../FlyoutBox'
import { useTranslation } from '../../../../utils'

const Wishlist = () => {
  const { t } = useTranslation()
  const {
    wishlist: { items: products },
  } = useShopWishlist()
  const { client } = useShopClient()

  const handleRemoveClick = (id) => {
    client.wishlist.removeItem({ input: { product: { id } } })
  }

  return (
    <FlyoutBox>
      <Text className="wishlist-box__title" element="p" size="cupid">
        {t('WISHLIST')}
      </Text>

      {products.length === 0 ? (
        <Text className="wishlist-box__no-products" size="bacchus" element="p">
          {t('WISHLIST_EMPTY')}
        </Text>
      ) : (
        <>
          <ProductList
            onRemoveClick={handleRemoveClick}
            hideHeading
            showRemoveButton
            products={products}
          />

          <Button
            type="submit"
            variant="primary"
            className="wishlist-box__button"
            iconPosition="left"
            href="#todo"
          >
            {t('WISHLIST_TO_FULL_OVERVIEW')}
          </Button>
        </>
      )}
    </FlyoutBox>
  )
}

export default Wishlist
