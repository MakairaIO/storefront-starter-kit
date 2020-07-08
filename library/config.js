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
import VideoTeaser, { videoTeaserVariants } from '../patterns/core/VideoTeaser'
import BackgroundVideo, {
  backgroundVideoVariants,
} from '../patterns/core/BackgroundVideo'
/* CLI MARKER - PATTER IMPORT - DO NOT REMOVE */

export default [
  {
    type: 'atom',
    name: 'Headings',
    component: Heading,
    variants: headingVariants,
  },
  {
    type: 'atom',
    name: 'Copytext',
    component: Copytext,
    variants: copytextVariants,
  },
  {
    type: 'atom',
    name: 'Buttons',
    component: Button,
    variants: buttonVariants,
  },
  {
    type: 'molecule',
    name: 'Dropdown',
    component: Dropdown,
    variants: dropdownVariants,
  },
  {
    type: 'static',
    name: 'Header',
    component: Header,
    variants: headerVariants,
  },
  {
    type: 'static',
    name: 'Product List',
    component: ProductList,
    variants: productListVariants,
  },
  {
    type: 'static',
    name: 'Product Information',
    component: ProductDetailInformation,
    variants: productDetailInformationVariants,
  },
  {
    type: 'placeable',
    name: 'Product Placement',
    component: ProductPlacement,
    variants: productPlacementVariants,
  },
  {
    type: 'placeable',
    name: 'Promotion',
    component: Promotion,
    variants: promotionVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser (Hero)',
    component: TeaserHero,
    variants: teaserHeroVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser (Grid)',
    component: TeaserGrid,
    variants: teaserGridVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser (Single)',
    component: TeaserSingle,
    variants: teaserSingleVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser (Products)',
    component: TeaserProducts,
    variants: teaserProductsVariants,
  },
  {
    type: 'placeable',
    name: 'Text (mehrspaltig)',
    component: MultiColumnText,
    variants: multiColumnTextVariants,
  },
  {
    type: 'placeable',
    name: 'Video Teaser',
    component: VideoTeaser,
    variants: videoTeaserVariants,
  },
  {
    type: 'component',
    name: 'Background Video',
    component: BackgroundVideo,
    variants: backgroundVideoVariants,
  },
  /* CLI MARKER - PATTERN CONFIG - DO NOT REMOVE */
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
