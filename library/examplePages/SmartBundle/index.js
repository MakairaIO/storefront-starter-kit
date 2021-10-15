import { useState } from 'react'
import Header, { headerVariants } from '../../../patterns/core/Header'
import BundleSelection, {
  bundleSelectionVariants,
} from '../../../patterns/core/BundleSelection'
import ProductList, {
  productListVariants,
} from '../../../patterns/core/ProductList'
import products from './products'

const headerProps = headerVariants[0].props
const bundleSelectionProps = bundleSelectionVariants[0].props
const productListProps = productListVariants[0].props

function getBundleFromId(id) {
  return products.find((product) => product.id == id)
}

function addSlotToBundle({ slots, product, currentSlot }) {
  const _slots = [...slots]
  const slotIndex = slots.findIndex((slot) => slot.id === currentSlot)
  _slots[slotIndex] = {
    ...slots[slotIndex],
    content: {
      button_text: slots[slotIndex].content.button_text,
      title: product.fields.title,
    },
    product: product.fields,
  }
  return _slots
}

function removeSlotFromBundle({ slots, slotId }) {
  const _slots = [...slots]
  const defaultSlot = bundleSelectionProps.config.slots.find(
    (slot) => slot.id === slotId
  )

  return _slots.map((slot) => (slot.id === slotId ? defaultSlot : slot))
}

function getCurrentSlot(slots = []) {
  for (let key in slots) {
    if (!slots[key].product) {
      return slots[key].id
    }
  }

  return slots[slots.length - 1].id
}

function validateBundle(slots = []) {
  return !slots.some((slot) => !slot.product)
}

export default function SmartBundle(props) {
  const [currentSlot, setCurrentSlot] = useState('s1')
  const [selectionConfig, setSelectionConfig] = useState(
    bundleSelectionProps.config
  )

  const addToBundle = (productId) => {
    const product = getBundleFromId(productId)
    const newSlots = addSlotToBundle({
      product,
      currentSlot,
      slots: selectionConfig.slots,
    })

    setSelectionConfig({
      ...selectionConfig,
      slots: newSlots,
      isComplete: validateBundle(newSlots),
    })

    setCurrentSlot(getCurrentSlot(newSlots))
  }

  const deleteSlot = (slotId) => {
    const newSlots = removeSlotFromBundle({
      slotId,
      slots: selectionConfig.slots,
    })

    setSelectionConfig({
      ...selectionConfig,
      slots: newSlots,
      isComplete: validateBundle(newSlots),
    })

    setCurrentSlot(getCurrentSlot(newSlots))
  }

  return (
    <>
      <Header {...props} {...headerProps} />
      <BundleSelection
        {...bundleSelectionProps}
        config={selectionConfig}
        currentSlot={currentSlot}
        editSlot={(id) => setCurrentSlot(id)}
        deleteSlot={deleteSlot}
      />
      <ProductList
        {...props}
        {...productListProps}
        products={products}
        addToBundle={addToBundle}
      />
    </>
  )
}
