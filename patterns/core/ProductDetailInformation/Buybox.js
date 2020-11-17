import { Dropdown } from '../..'
import ProductPrices from './ProductPrices'
import ProductAvailability from './ProductAvailability'
import ProductActions from './ProductActions'
import { useState } from 'react'

function prepareVariants({ attributes = [], attributeId = '' }) {
  const attributeArray = attributeId
    ? attributes.filter((a) => a.title == attributeId)
    : attributes

  return attributeArray.map((a) => {
    return {
      label: a.value,
      value: a.value,
    }
  })
}

// TODO: Remove hard-coded implementation
export default function Buybox(props) {
  let variants = []
  const makairaProduct = props['makaira-product']
  const [productInformation, setProductInformation] = useState(props)

  if (makairaProduct) {
    variants = Array.isArray(makairaProduct) ? makairaProduct : [makairaProduct]
  }

  const attributes = variants.map((variant) => {
    const { attributeStr } = variant
    return attributeStr
  })

  // Merge all attributeStr of variants
  const attributeStr = attributes.reduce((array, attr) => {
    return array.concat(attr)
  }, [])

  const attributeStrVariants = prepareVariants({
    attributes: attributeStr,
    attributeId: '',
  })

  const handleOnchange = (attribute) => {
    const { value } = attribute
    const variant = variants.find((variant) => {
      const { attributeStr } = variant
      return attributeStr.find((a) => a.value === value)
    })

    setProductInformation(variant)
  }

  return (
    <div className="product-detail-information__buybox">
      <div className="product-detail-information__variants">
        <Dropdown
          id="sizeVariant"
          label="Size"
          options={attributeStrVariants}
          onChange={(attribute) => handleOnchange(attribute)}
          className="product-detail-information__variant-select"
        />
      </div>

      <div className="product-detail-information__buybox-wrapper">
        <figure className="product-detail-information__manufacturer"></figure>

        <div className="product-detail-information__buxbox-info">
          <ProductPrices {...productInformation} />

          <ProductAvailability {...props} />
        </div>
      </div>

      <ProductActions {...props} />
    </div>
  )
}
