import { Dropdown } from '../..'
import ProductPrices from './ProductPrices'
import ProductAvailability from './ProductAvailability'
import ProductActions from './ProductActions'

function prepareVariants({ attributes = [], attributeId = '' }) {
  return attributes
    .filter((a) => a.id == attributeId)
    .map((a) => {
      return {
        label: a.value,
        value: a.value,
      }
    })
}

// TODO: Remove hard-coded implementation
export default function Buybox(props) {
  const { attributeStr } = props

  const sizeVariants = prepareVariants({
    attributes: attributeStr,
    attributeId: 'attribute-size',
  })

  const colorVariants = prepareVariants({
    attributes: attributeStr,
    attributeId: 'attribute-color',
  })

  return (
    <div className="product-detail-information__buybox">
      <div className="product-detail-information__variants">
        <Dropdown
          id="sizeVariant"
          label="Size"
          options={sizeVariants}
          onChange={() => console.log('todo')}
          className="product-detail-information__variant-select"
        />

        <Dropdown
          id="colorVariant"
          label="Color"
          options={colorVariants}
          onChange={() => console.log('todo')}
          className="product-detail-information__variant-select"
        />
      </div>

      <div className="product-detail-information__buybox-wrapper">
        <figure className="product-detail-information__manufacturer"></figure>

        <div className="product-detail-information__buxbox-info">
          <ProductPrices {...props} />

          <ProductAvailability {...props} />
        </div>
      </div>

      <ProductActions {...props} />
    </div>
  )
}
