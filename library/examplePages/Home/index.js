import Header, { headerVariants } from '../../../patterns/core/Header'
import TeaserHero, {
  teaserHeroVariants,
} from '../../../patterns/core/TeaserHero'
import Promotion, { promotionVariants } from '../../../patterns/core/Promotion'
import TeaserGrid, {
  teaserGridVariants,
} from '../../../patterns/core/TeaserGrid'
import MultiColumnText, {
  multiColumnTextVariants,
} from '../../../patterns/core/MultiColumnText'
import TeaserProducts, {
  teaserProductsVariants,
} from '../../../patterns/core/TeaserProducts'
import ProductPlacement, {
  productPlacementVariants,
} from '../../../patterns/core/ProductPlacement'

const headerProps = headerVariants[0].props
const teaserHeroProps = teaserHeroVariants[0].props
const promotionProps = promotionVariants[0].props
const teaserGridProps = teaserGridVariants[0].props
const multiColumnTextProps = multiColumnTextVariants[6].props
const teaserProductsProps = teaserProductsVariants[0].props
const productPlacementProps = productPlacementVariants[0].props

export default function Home(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
      <TeaserHero {...props} {...teaserHeroProps} />
      <MultiColumnText {...props} {...multiColumnTextProps} />
      <Promotion {...props} {...promotionProps} />
      <TeaserGrid {...props} {...teaserGridProps} />
      <ProductPlacement {...props} {...productPlacementProps} />
      <TeaserProducts {...props} {...teaserProductsProps} />
    </>
  )
}
