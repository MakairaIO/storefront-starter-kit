import { useState, useEffect } from 'react'
import {
  useGlobalData,
  fetchRecommendationData,
  useTranslation,
  redirectToBundle,
} from '../../../utils'
import {
  Breadcrumb,
  ContentElements,
  ProductDetailInformation,
  ProductPlacement,
  Ratings,
} from '../../../patterns'
import { ratingVariants } from '../../../patterns/core/Ratings'
import Metadata from '../Metadata'

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
      <Ratings ratings={ratingVariants[0].props.ratings} />
      <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      />
    </main>
  )
}

export default DetailPage
