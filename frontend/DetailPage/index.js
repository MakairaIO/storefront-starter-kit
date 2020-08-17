import { useState, useEffect } from 'react'
import {
  useGlobalData,
  fetchRecommendationData,
  useTranslation,
} from '../../utils'
import { ProductDetailInformation, ProductPlacement } from '../../patterns'

function DetailPage() {
  const { t } = useTranslation()
  const { pageData } = useGlobalData()
  const productDetailProps = { ...pageData.data.self }
  const [products, setProducts] = useState([])
  const productId = productDetailProps.id

  useEffect(() => {
    async function getProducts() {
      const response = await fetchRecommendationData({ productId })
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
    text: t('RECOMMENDATION_TEXT'),
    products,
  }

  return (
    <main>
      <ProductDetailInformation {...productDetailProps} />
      <ProductPlacement {...productPlacementProps} />
    </main>
  )
}

export default DetailPage
