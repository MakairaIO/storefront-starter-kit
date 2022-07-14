import { useState, useEffect } from 'react'
import { useTranslation } from '../../../utils'
import ProductPrices from './ProductPrices'
import ProductAvailability from './ProductAvailability'
import ProductActions from './ProductActions'
import VariantSelection from './VariantSelection'

export default function Buybox(props) {
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)
  const {
    attributeStr = [],
    setActiveVariant,
    'makaira-product': variants = [],
  } = props

  // Grab all available sizes and colors off the parent
  const sizeValues = attributeStr.find((attr) => attr.id === 'size')?.['value']
  const colorValues = attributeStr.find((attr) => attr.id === 'color')?.[
    'value'
  ]

  const [selectedSize, setSelectedSize] = useState(sizeValues?.[0])
  const [selectedColor, setSelectedColor] = useState(colorValues?.[0])

  useEffect(() => {
    const colorVariant = variants.find((variant) => {
      const color = variant.attributeStr.find((attr) => attr.id === 'color')[
        'value'
      ]

      return color === selectedColor
    })

    setActiveVariant(colorVariant)
  }, [selectedColor, setActiveVariant, variants])

  function handleAddToCart() {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <div className="product-detail-information__buybox">
      <div className="product-detail-information__buybox-wrapper">
        <figure className="product-detail-information__manufacturer"></figure>

        <div className="product-detail-information__buxbox-info">
          <ProductPrices {...props} />

          <ProductAvailability {...props} />
        </div>
      </div>

      <div className="product-detail-information__variants">
        <VariantSelection
          title={t('PRODUCT_DETAIL_VARIANT_SELECTION_SIZE')}
          values={sizeValues}
          selected={selectedSize}
          setSelected={setSelectedSize}
        />
        <VariantSelection
          title={t('PRODUCT_DETAIL_VARIANT_SELECTION_COLOR')}
          values={colorValues}
          selected={selectedColor}
          setSelected={setSelectedColor}
        />
      </div>

      <ProductActions
        {...props}
        isLoading={isLoading}
        addToCart={handleAddToCart}
      />
    </div>
  )
}
