import { useState, useEffect } from 'react'
import {
  useGlobalData,
  fetchRecommendationData,
  useTranslation,
  redirectToBundle,
  GTM,
  prepareTrackingItem,
} from '../../../utils'
import {
  Breadcrumb,
  ContentElements,
  ProductDetailInformation,
  ProductPlacement,
  Ratings,
} from '../../../patterns'
import Metadata from '../Metadata'

function DetailPage() {
  const { t, language } = useTranslation()
  const { pageData, params } = useGlobalData()
  const [products, setProducts] = useState([])
  const productId = pageData.data.self.id

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetchRecommendationData({
          productId,
          recommendationId: 'similar-products',
          language,
        })

        const recommendationProducts = response.items
        const formattedProduct = recommendationProducts.map(
          (product) => product.fields
        )
        setProducts(formattedProduct)
      } catch (exception) {
        setProducts([])
      }
    }

    function trackViewEvent() {
      if (pageData.data?.self) {
        GTM.trackEvent({
          event: 'view_item',
          ecommerce: {
            items: [prepareTrackingItem(pageData.data.self)],
          },
          _clear: true,
        })
      }
    }

    getProducts()

    trackViewEvent()
  }, [productId, language, pageData])

  const productPlacementProps = {
    heading: t('RECOMMENDATION_HEADING'),
    products,
  }

  const productDetailProps = {
    ...pageData.data.self,
    productId,
    addToBundle: () => {
      const product = pageData.data.self
      redirectToBundle({ product, params })
    },
  }

  return (
    <main>
      <Metadata
        title={pageData.data.self.title}
        keywords={pageData.data.self.meta_keywords}
        description={pageData.data.self.meta_description}
      />
      <Breadcrumb product={pageData.data.self} />
      <ContentElements
        elements={pageData.data.self.contentElements?.top?.elements}
      />
      <ProductDetailInformation
        key={productDetailProps.id}
        {...productDetailProps}
      />
      <ProductPlacement {...productPlacementProps} />
      <Ratings {...productDetailProps} />
      <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      />
    </main>
  )
}

export default DetailPage
