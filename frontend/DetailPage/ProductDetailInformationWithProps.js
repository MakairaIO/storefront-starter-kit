import { ProductDetailInformation } from '../../patterns'
import { useGlobalData } from '../../utils'

export default function ProductListWithProps() {
  const { pageData } = useGlobalData()

  const productDetailProps = { ...pageData.data.self }

  return (
    <>
      <ProductDetailInformation {...productDetailProps} />
    </>
  )
}
