import TopHeader from './TopHeader'
import Image from './Image'
import Buybox from './Buybox'
import Description from './Description'
import { useState } from 'react'

// TODO: Adjust the attribute title as needed on a per-project basis
const VARIANT_ATTRIBUTE_TITLE = '(VarSelect)'

function prepareVariants({ attributes = [] }) {
  return attributes
    .filter((attr) => attr.title.trim() == VARIANT_ATTRIBUTE_TITLE)
    .map((attr) => {
      return {
        label: attr.value,
        value: attr.value,
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

  const variantsAttributeStr = prepareVariants({ attributes: attributeStr })

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
