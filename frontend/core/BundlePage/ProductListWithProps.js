import { BundleSelection, ProductList } from '../../../patterns'
import {
  useGlobalData,
  mergeProductsAndBanners,
  submitProductListForms,
  resetAllProductListFilters,
  submitBundleForm,
} from '../../../utils'
import { useEffect, useState } from 'react'

function BundleForm() {
  const { pageData, params } = useGlobalData()
  const bundleId = pageData.data.self.id
  const slots = pageData.data.self.config.slots

  return (
    <form className="bundle-form">
      <input type="hidden" name="bundleId" value={bundleId} />
      <input type="hidden" name="currentSlot" value={params.currentSlot} />

      {slots.map((slot, index) => {
        return (
          <input
            key={index}
            type="hidden"
            name={`slots[${slot.id}]`}
            value={slot.product ? slot.product.id : ''}
          />
        )
      })}
    </form>
  )
}

export default function ProductListWithProps() {
  const { pageData, params = {} } = useGlobalData()
  const [bundleForm, setBundleForm] = useState()

  useEffect(() => {
    setBundleForm(document.querySelector('.bundle-form'))
  }, [])

  // restParams = sorting, pagination, ...
  const { filter, ...restParams } = params

  const bundle = pageData.data.self.config
  const products = pageData.data.product.items
  const banners = pageData.data.banners
  const merged = mergeProductsAndBanners({ products, banners })

  const aggregations = pageData.data.product.aggregations
  const totalProductCount = pageData.data.product.total

  const productListProps = {
    products: merged,
    aggregations,
    submitForms: async (options = {}) => {
      const { resetPagination = false } = options

      await submitProductListForms({ aggregations, resetPagination })
    },
    resetAllFilters: () => resetAllProductListFilters({ isBundle: true }),
    queryParams: restParams,
    totalProductCount,
    isBundle: true,
    addToBundle: (productId) => {
      bundleForm[`slots[${bundle.currentSlot}]`].value = productId
      bundleForm.currentSlot.value = ''
      submitBundleForm()
    },
  }

  const bundleProps = {
    params,
    config: pageData.data.self.config,
    bundleId: pageData.data.self.id,
    currentSlot: pageData.data.self.config.currentSlot,
    language: pageData.language,
    errors: pageData.data.validation,
    editSlot: (slotId) => {
      bundleForm.currentSlot.value = slotId
      submitBundleForm()
    },
    deleteSlot: (slotId) => {
      bundleForm[`slots[${slotId}]`].value = ''
      bundleForm.currentSlot.value = ''
      submitBundleForm()
    },
  }

  return (
    <>
      <BundleForm />
      <BundleSelection {...bundleProps} />
      <ProductList {...productListProps} />
    </>
  )
}
