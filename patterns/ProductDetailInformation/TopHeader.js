import { Heading } from '..'
import ProductPrices from './ProductPrices'

export default function TopHeader(props) {
  const { title = '' } = props

  return (
    <div className="product-detail-information__top-header">
      <Heading size="diana" weight="600">
        {title}
      </Heading>

      <ProductPrices {...props} />
    </div>
  )
}
