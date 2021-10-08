/* Core imports */
import Heading, { headingVariants } from '../patterns/core/Heading'
import Copytext, { copytextVariants } from '../patterns/core/Copytext'
import Button, { buttonVariants } from '../patterns/core/Button'
import Dropdown, { dropdownVariants } from '../patterns/core/Dropdown'
import Header, { headerVariants } from '../patterns/core/Header'
import Footer, { footerVariants } from '../patterns/core/Footer'
import ProductList, { productListVariants } from '../patterns/core/ProductList'
import ProductDetailInformation, {
  productDetailInformationVariants,
} from '../patterns/core/ProductDetailInformation'
import ProductPlacement, {
  productPlacementVariants,
} from '../patterns/core/ProductPlacement'
import StreamPlacement, {
  streamPlacementVariants,
} from '../patterns/core/StreamPlacement'
import Promotion, { promotionVariants } from '../patterns/core/Promotion'
import TeaserHero, { teaserHeroVariants } from '../patterns/core/TeaserHero'
import TeaserVideo, { teaserVideoVariants } from '../patterns/core/TeaserVideo'
import TeaserGrid, { teaserGridVariants } from '../patterns/core/TeaserGrid'
import TeaserDuo, { teaserDuoVariants } from '../patterns/core/TeaserDuo'
import TeaserSingle, {
  teaserSingleVariants,
} from '../patterns/core/TeaserSingle'
import TeaserProducts, {
  teaserProductsVariants,
} from '../patterns/core/TeaserProducts'
import DiscoveryImage, {
  discoveryImageVariants,
} from '../patterns/core/DiscoveryImage'
import MultiColumnText, {
  multiColumnTextVariants,
} from '../patterns/core/MultiColumnText'
import ContactForm, { contactFormVariants } from '../patterns/core/ContactForm'

import Home from './examplePages/Home'
import Listing from './examplePages/Listing'
import Detail from './examplePages/Detail'
import SmartBundle from './examplePages/SmartBundle'
import ErrorPage from '../patterns/core/ErrorPage'

/* Add project specific imports here */
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
    name: 'Footer',
    component: Footer,
    variants: footerVariants,
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
    name: 'Stream Placement',
    component: StreamPlacement,
    variants: streamPlacementVariants,
  },
  {
    type: 'placeable',
    name: 'Discovery Image',
    component: DiscoveryImage,
    variants: discoveryImageVariants,
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
    name: 'Teaser (Video)',
    component: TeaserVideo,
    variants: teaserVideoVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser (Grid)',
    component: TeaserGrid,
    variants: teaserGridVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser (Duo)',
    component: TeaserDuo,
    variants: teaserDuoVariants,
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
    name: 'Contact Form',
    component: ContactForm,
    variants: contactFormVariants,
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
    name: 'Smart Bundle Page',
    component: SmartBundle,
    variants: [{ name: 'Smart Bundle Example' }],
  },
  {
    type: 'page',
    name: 'Detail Page',
    component: Detail,
    variants: [{ name: 'Detail Page Example' }],
  },
  {
    type: 'page',
    name: 'Error Page',
    component: ErrorPage,
    variants: [{ name: 'Error Page Example' }],
  },
]
