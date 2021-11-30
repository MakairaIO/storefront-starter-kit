import { useState, useEffect } from 'react'
import {
  useGlobalData,
  fetchRecommendationData,
  useTranslation,
  redirectToBundle,
} from '../../utils'
import {
  ContentElements,
  ProductDetailInformation,
  ProductPlacement,
} from '../../patterns'

function DetailPage() {
  const { t, language } = useTranslation()
  const { pageData, params } = useGlobalData()
  const [products, setProducts] = useState([])
  const productId = pageData.data.self.id

  useEffect(() => {
    async function getProducts() {
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
    }
    getProducts()
  }, [productId, language])

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
      <ContentElements
        elements={pageData.data.self.promotions?.top?.elements}
      />
      <ProductDetailInformation
        key={productDetailProps.id}
        {...productDetailProps}
      />
      <ProductPlacement {...productPlacementProps} />
      <ContentElements
        elements={pageData.data.self.promotions?.bottom?.elements}
      />
    </main>
  )
}

export default DetailPage
