/* Core imports */
import Heading, { headingVariants } from '../patterns/core/Heading'
import Copytext, { copytextVariants } from '../patterns/core/Copytext'
import Button, { buttonVariants } from '../patterns/core/Button'
import Dropdown, { dropdownVariants } from '../patterns/core/Dropdown'
import Header, { headerVariants } from '../patterns/core/Header'
import ProductList, { productListVariants } from '../patterns/core/ProductList'
import ProductDetailInformation, {
  productDetailInformationVariants,
} from '../patterns/core/ProductDetailInformation'
import ProductPlacement, {
  productPlacementVariants,
} from '../patterns/core/ProductPlacement'
import Promotion, { promotionVariants } from '../patterns/core/Promotion'
import TeaserHero, { teaserHeroVariants } from '../patterns/core/TeaserHero'
import TeaserGrid, { teaserGridVariants } from '../patterns/core/TeaserGrid'
import TeaserSingle, {
  teaserSingleVariants,
} from '../patterns/core/TeaserSingle'
import TeaserProducts, {
  teaserProductsVariants,
} from '../patterns/core/TeaserProducts'
import MultiColumnText, {
  multiColumnTextVariants,
} from '../patterns/core/MultiColumnText'

import Home from './examplePages/Home'
import Listing from './examplePages/Listing'
import Detail from './examplePages/Detail'

/* Add project specific imports here */

export default [
  {
    type: 'component',
    name: 'Headings',
    component: Heading,
    variants: headingVariants,
  },
  {
    type: 'component',
    name: 'Copytext',
    component: Copytext,
    variants: copytextVariants,
  },
  {
    type: 'component',
    name: 'Buttons',
    component: Button,
    variants: buttonVariants,
  },
  {
    type: 'component',
    name: 'Dropdown',
    component: Dropdown,
    variants: dropdownVariants,
  },
  {
    type: 'component',
    name: 'Header',
    component: Header,
    variants: headerVariants,
  },
  {
    type: 'component',
    name: 'Product List',
    component: ProductList,
    variants: productListVariants,
  },
  {
    type: 'component',
    name: 'Product Information',
    component: ProductDetailInformation,
    variants: productDetailInformationVariants,
  },
  {
    type: 'component',
    name: 'Product Placement',
    component: ProductPlacement,
    variants: productPlacementVariants,
  },
  {
    type: 'component',
    name: 'Promotion',
    component: Promotion,
    variants: promotionVariants,
  },
  {
    type: 'component',
    name: 'Teaser (Hero)',
    component: TeaserHero,
    variants: teaserHeroVariants,
  },
  {
    type: 'component',
    name: 'Teaser (Grid)',
    component: TeaserGrid,
    variants: teaserGridVariants,
  },
  {
    type: 'component',
    name: 'Teaser (Single)',
    component: TeaserSingle,
    variants: teaserSingleVariants,
  },
  {
    type: 'component',
    name: 'Teaser (Products)',
    component: TeaserProducts,
    variants: teaserProductsVariants,
  },
  {
    type: 'component',
    name: 'Text (mehrspaltig)',
    component: MultiColumnText,
    variants: multiColumnTextVariants,
  },
  {
    type: 'page',
    name: 'Landing Page',
    component: Home,
    variants: [{ name: 'Home' }],
  },
  {
    type: 'page',
    name: 'Listing Page',
    component: Listing,
    variants: [{ name: 'Listing Page Example' }],
  },
  {
    type: 'page',
    name: 'Detail Page',
    component: Detail,
    variants: [{ name: 'Detail Page Example' }],
  },
]
