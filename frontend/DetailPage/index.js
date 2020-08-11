import { useState, useEffect } from 'react'
import { useGlobalData, fetchRecommendationData } from '../../utils'
import { ProductDetailInformation, ProductPlacement } from '../../patterns'

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
      <ProductDetailInformation {...productDetailProps} />
      <ProductPlacement {...productPlacementProps} />
    </main>
  )
}

export default DetailPage
