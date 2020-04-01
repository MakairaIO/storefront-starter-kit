/* Core imports */
import Heading, { headingVariants } from '../patterns/core/Heading'
import Copytext, { copytextVariants } from '../patterns/core/Copytext'
import Button, { buttonVariants } from '../patterns/core/Button'
import Header, { headerVariants } from '../patterns/core/Header'
import ProductList, { productListVariants } from '../patterns/core/ProductList'
import ProductPlacement, {
  productPlacementVariants,
} from '../patterns/core/ProductPlacement'
import TeaserHero, { teaserHeroVariants } from '../patterns/core/TeaserHero'
import TeaserProducts, {
  teaserProductsVariants,
} from '../patterns/core/TeaserProducts'
import TeaserSingle, {
  teaserSingleVariants,
} from '../patterns/core/TeaserSingle'
import MultiColumnText, {
  multiColumnTextVariants,
} from '../patterns/core/MultiColumnText'

import Home from './examplePages/Home'
import Listing from './examplePages/Listing'

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
    name: 'Product Placement',
    component: ProductPlacement,
    variants: productPlacementVariants,
  },
  {
    type: 'component',
    name: 'Teaser (Hero)',
    component: TeaserHero,
    variants: teaserHeroVariants,
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
]
