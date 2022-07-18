import ProductItem from './ProductItem'
import { useTranslation } from '../../../../utils'
import { Heading } from '../../..'

function ProductList(props) {
  const {
    products = [],
    count = 1,
    hideHeading = false,
    showRemoveButton = false,
    onRemoveClick = () => {},
  } = props
  const { t } = useTranslation()

  return (
    <>
      {!hideHeading && (
        <Heading size="bacchus" element="h2">
          {count > 1 ? t('FILTER_LABEL_PRODUCTS') : t('FILTER_LABEL_PRODUCT')}
        </Heading>
      )}

      <ul className="autosuggest__products">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            {...product.fields}
            showRemoveButton={showRemoveButton}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </ul>
    </>
  )
}

export default ProductList
