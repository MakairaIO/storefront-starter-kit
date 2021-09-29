import { useState } from 'react'
import { Dropdown, CartModal, ErrorModal } from '..'
import ProductPrices from './ProductPrices'
import ProductAvailability from './ProductAvailability'
import ProductActions from './ProductActions'

// TODO: Remove hard-coded implementation
export default function Buybox(props) {
  const {
    addToCart,
    chooseVariant = () => {},
    variantsAttributeStr = [],
  } = props

  const [loading, setLoading] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleAddToCart = async (payload) => {
    setLoading(true)

    const success = await addToCart(payload)

    setLoading(false)
    success ? setShowSuccessModal(true) : setShowErrorModal(true)
  }

  const handleModalClose = () => {
    setShowErrorModal(false)
    setShowSuccessModal(false)
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

      <CartModal isVisible={showSuccessModal} closeModal={handleModalClose} />
      <ErrorModal isVisible={showErrorModal} closeModal={handleModalClose} />
    </div>
  )
}
