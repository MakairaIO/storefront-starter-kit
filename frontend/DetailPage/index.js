import { useState, useEffect } from 'react'
import {
  useGlobalData,
  fetchRecommendationData,
  useTranslation,
} from '../../utils'
import {
  ContentElements,
  ProductDetailInformation,
  ProductPlacement,
} from '../../patterns'

function DetailPage() {
  const { t } = useTranslation()
  const { pageData } = useGlobalData()
  const productDetailProps = { ...pageData.data.self }
  const [products, setProducts] = useState([])
  const productId = productDetailProps.id

  useEffect(() => {
    async function getProducts() {
      const response = await fetchRecommendationData({
        productId,
        recommendationId: 'similar-products',
      })
      const recommendationProducts = response.items
      const formattedProduct = recommendationProducts.map(
        (product) => product.fields
      )
      setProducts(formattedProduct)
    }
    getProducts()
  }, [productId])

  const productPlacementProps = {
    heading: t('RECOMMENDATION_HEADING'),
    products,
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
