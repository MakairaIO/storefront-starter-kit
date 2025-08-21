import Header, { headerVariants } from '../../../patterns/Header'
import Footer, { footerVariants } from '../../../patterns/Footer'
import TeaserSimple, {
  teaserSimpleVariants,
} from '../../../patterns/TeaserSimple'
import TeaserEnhanced, {
  teaserEnhancedVariants,
} from '../../../patterns/TeaserEnhanced'

const headerProps = headerVariants[0].props
const footerProps = footerVariants[0].props
const teaserSimpleProps = teaserSimpleVariants[0].props
const teaserEnhancedProps = teaserEnhancedVariants[0].props

export default function Home(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
      <TeaserSimple {...props} {...teaserSimpleProps} />
      <TeaserEnhanced {...props} {...teaserEnhancedProps} />
      <Footer {...props} {...footerProps} />
    </>
  )
}
