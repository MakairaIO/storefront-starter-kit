import { useState, useEffect, useMemo } from 'react'
import { useTranslation, GTM, prepareTrackingItem } from '../../../utils'
import ProductPrices from './ProductPrices'
import ProductAvailability from './ProductAvailability'
import ProductActions from './ProductActions'
import VariantSelection from './VariantSelection'

export default function Buybox(props) {
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { attributeStr = [], activeVariant, setActiveVariant } = props

  /**
   * Due to backwards compatibility, we have to take into account that `makaira-product`
   * could be a single object instead of an array of objects
   */
  const variants = useMemo(() => {
    const makairaProduct = props['makaira-product'] ?? []

    return Array.isArray(makairaProduct) ? makairaProduct : [makairaProduct]
  }, [props])

  // Grab all available sizes and colors off the parent
  const sizeValues = attributeStr.find((attr) => attr.id === 'size')?.['value']
  const colorValues = attributeStr.find((attr) => attr.id === 'color')?.[
    'value'
  ]

  const [selectedSize, setSelectedSize] = useState(sizeValues?.[0])
  const [selectedColor, setSelectedColor] = useState(colorValues?.[0])

  useEffect(() => {
    const colorVariant = variants.find((variant) => {
      const variantAttributes = variant.attributeStr ?? []
      const color = variantAttributes.find((attr) => attr.id === 'color')?.[
        'value'
      ]

      return color === selectedColor
    })

    setActiveVariant(colorVariant)
  }, [selectedColor, setActiveVariant, variants])

  function handleAddToCart() {
    setLoading(true)

    GTM.trackEvent({
      event: 'add_to_cart',
      ecommerce: {
        items: [prepareTrackingItem(activeVariant, quantity)],
      },
      _clear: true,
    })

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  function handleAddToWishlist() {
    GTM.trackEvent({
      event: 'add_to_wishlist',
      ecommerce: {
        items: [prepareTrackingItem(activeVariant)],
      },
      _clear: true,
    })
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
        addToWishlist={handleAddToWishlist}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  )
}
