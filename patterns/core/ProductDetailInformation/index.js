import TopHeader from './TopHeader'
import Image from './Image'
import Buybox from './Buybox'
import Description from './Description'
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

function ProductDetailInformation(props) {
  const makairaProduct = props['makaira-product']
  const [productInformation, setProductInformation] = useState(props)

  const hasMultiVariant =
    Array.isArray(makairaProduct) && makairaProduct.length > 1
  const variants = hasMultiVariant ? makairaProduct : []

  const attributes = variants.map((variant) => {
    const { attributeStr } = variant
    return attributeStr
  })

  // Merge all attributeStr of variants
  const attributeStr = attributes.reduce((array, attr) => {
    return array.concat(attr)
  }, [])

  const variantsAttributeStr = prepareVariants({
    attributes: attributeStr,
    attributeId: '',
  })

  const chooseVariant = (attribute) => {
    const { value } = attribute
    const chosenVariant = variants.find((variant) => {
      const { attributeStr } = variant
      return attributeStr.find((a) => a.value === value)
    })

    setProductInformation(chosenVariant)
  }

  return (
    <section className="product-detail-information">
      <TopHeader {...productInformation} />

      <div className="product-detail-information__wrapper">
        <Image {...productInformation} />

        <Buybox
          {...productInformation}
          chooseVariant={chooseVariant}
          variantsAttributeStr={variantsAttributeStr}
        />

        <Description {...productInformation} />
      </div>
    </section>
  )
}

export default ProductDetailInformation
export { default as productDetailInformationVariants } from './variants.js'
