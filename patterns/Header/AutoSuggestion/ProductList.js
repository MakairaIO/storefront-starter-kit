import ProductItem from './ProductItem'
import { useTranslation } from '../../../utils'
import { Heading } from '../..'

function ProductList(props) {
  const { products = [], count = 1 } = props
  const { t } = useTranslation()

  return (
    <>
      <Heading size="bacchus" element="h2">
        {count > 1 ? t('FILTER_LABEL_PRODUCTS') : t('FILTER_LABEL_PRODUCT')}
      </Heading>
      <ul className="autosuggest__products">
        {products.map((product) => (
          <ProductItem key={product.id} {...product.fields} />
        ))}
      </ul>
    </>
  )
}

export default ProductList
