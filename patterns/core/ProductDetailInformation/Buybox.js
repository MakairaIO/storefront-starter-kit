import { useState } from 'react'
import { Dropdown } from '../..'
import ProductPrices from './ProductPrices'
import ProductAvailability from './ProductAvailability'
import ProductActions from './ProductActions'

// TODO: Remove hard-coded implementation
export default function Buybox(props) {
  const { chooseVariant = () => {}, variantsAttributeStr = [] } = props
  const [loading, setLoading] = useState(false)

  const handleAddToCart = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <div className="product-detail-information__buybox">
      <div className="product-detail-information__variants">
        <Dropdown
          id="sizeVariant"
          label="Size"
          options={variantsAttributeStr}
          onChange={(attribute) => chooseVariant(attribute)}
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

      <ProductActions
        {...props}
        loading={loading}
        addToCart={handleAddToCart}
      />
    </div>
  )
}
