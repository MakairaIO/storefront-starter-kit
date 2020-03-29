import Header, { headerVariants } from '../../../patterns/core/Header'
import TeaserSingle, {
  teaserSingleVariants,
} from '../../../patterns/core/TeaserSingle'
import ProductList, {
  productListVariants,
} from '../../../patterns/core/ProductList'

const headerProps = headerVariants[0].props
const teaserSingleProps = teaserSingleVariants[0].props
const productListProps = productListVariants[0].props

export default function Listing(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
      <TeaserSingle {...props} {...teaserSingleProps} />
      <ProductList {...props} {...productListProps} />
    </>
  )
}
