import { useState, useEffect } from 'react'
import { useGlobalData } from '../../utils'
import fetchRecommendationData from '../../utils/core/fetchRecommendationData'
import ProductDetailInformation from './ProductDetailInformationWithProps'
import ProductPlacement from '../../patterns/core/ProductPlacement'

function DetailPage() {
  const { pageData } = useGlobalData()
  const productDetailProps = { ...pageData.data.self }
  const [products, setProducts] = useState([])
  const productId = productDetailProps.id

  useEffect(() => {
    async function getProducts() {
      const response = await fetchRecommendationData({ productId })
      const recommendProducts = response.items
      const formatedProduct = recommendProducts.map((product) => product.fields)
      setProducts(formatedProduct)
    }
    getProducts()
  }, [productId])

  const productPlacementProps = {
    heading: 'Ähnliche Produkte',
    text:
      'Copytext Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    products,
  }

  return (
    <main>
      <ProductDetailInformation />
      <ProductPlacement {...productPlacementProps} />
    </main>
  )
}

export default DetailPage
