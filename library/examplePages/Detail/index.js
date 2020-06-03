import Header, { headerVariants } from '../../../patterns/core/Header'
import ProductDetailInformation, {
  productDetailInformationVariants,
} from '../../../patterns/core/ProductDetailInformation'

const headerProps = headerVariants[0].props
const productDetailInformationProps = productDetailInformationVariants[0].props

export default function Home(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
      <ProductDetailInformation {...props} {...productDetailInformationProps} />
    </>
  )
}
