import ProductDetailInformation, {
  productDetailInformationVariants,
} from '../../../patterns/core/ProductDetailInformation'

const productDetailInformationProps = productDetailInformationVariants[0].props

export default function Home(props) {
  return (
    <>
      <ProductDetailInformation {...props} {...productDetailInformationProps} />
    </>
  )
}
