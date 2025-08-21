/* Core imports */
import Heading, { headingVariants } from '../patterns/Heading'
import Copytext, { copytextVariants } from '../patterns/Copytext'
import Button, { buttonVariants } from '../patterns/Button'
// import Dropdown, { dropdownVariants } from '../patterns/core/Dropdown'
import Header, { headerVariants } from '../patterns/Header'
import Footer, { footerVariants } from '../patterns/Footer'
// import ProductList, { productListVariants } from '../patterns/core/ProductList'
// import ProductDetailInformation, {
//   productDetailInformationVariants,
// } from '../patterns/core/ProductDetailInformation'
// import ProductPlacement, {
//   productPlacementVariants,
// } from '../patterns/core/ProductPlacement'
// import Promotion, { promotionVariants } from '../patterns/core/Promotion'
// import TeaserHero, { teaserHeroVariants } from '../patterns/core/TeaserHero'
// import TeaserVideo, { teaserVideoVariants } from '../patterns/core/TeaserVideo'
// import TeaserGrid, { teaserGridVariants } from '../patterns/core/TeaserGrid'
// import TeaserDuo, { teaserDuoVariants } from '../patterns/core/TeaserDuo'
// import TeaserSingle, {
//   teaserSingleVariants,
// } from '../patterns/core/TeaserSingle'
// import TeaserProducts, {
//   teaserProductsVariants,
// } from '../patterns/core/TeaserProducts'
// import DiscoveryImage, {
//   discoveryImageVariants,
// } from '../patterns/core/DiscoveryImage'
// import MultiColumnText, {
//   multiColumnTextVariants,
// } from '../patterns/core/MultiColumnText'

import Home from './examplePages/Home'
// import Listing from './examplePages/Listing'
// import Detail from './examplePages/Detail'
// import ErrorPage from '../patterns/core/ErrorPage'

/* Add project specific imports here */
import Elevation, { elevationVariants } from '../patterns/Elevation'
import Card, { cardVariants } from '../patterns/Card'
import LogoBar, { logoBarVariants } from '../patterns/LogoBar'
import InputIcon, { inputIconVariants } from '../patterns/InputIcon'
import Tags, { tagsVariants } from '../patterns/Tags'
import TeaserSimple, { teaserSimpleVariants } from '../patterns/TeaserSimple'
import TeaserEnhanced, {
  teaserEnhancedVariants,
} from '../patterns/TeaserEnhanced'
import Divider, { dividerVariants } from '../patterns/Divider'
import FeatureIcons, { featureIconsVariants } from '../patterns/FeatureIcons'
import SimpleOpener, { simpleOpenerVariants } from '../patterns/SimpleOpener'
import Quotes, { quotesVariants } from '../patterns/Quotes'
import Avatar, { avatarVariants } from '../patterns/Avatar'
import UserInfo, { userInfoVariants } from '../patterns/UserInfo'
import CTAOpener, { cTAOpenerVariants } from '../patterns/CTAOpener'
import CTATrap, { cTATrapVariants } from '../patterns/CTATrap'
import Stream, { streamVariants } from '../patterns/Stream'
import StreamSimplify, {
  streamSimplifyVariants,
} from '../patterns/StreamSimplify'
// import Tab, { tabVariants } from '../patterns/Tab'
import SearchResults, { searchResultsVariants } from '../patterns/SearchResults'
import TextContent, { textContentVariants } from '../patterns/TextContent'
import EmbeddedVideo, { embeddedVideoVariants } from '../patterns/EmbeddedVideo'
import Forms, { formsVariants } from '../patterns/Forms'
import OmrReviews, { omrReviewsVariants } from '../patterns/OmrReviews'
import USPsIcons, { uSPsIconsVariants } from '../patterns/USPsIcons'
import Card2Col, { card2ColVariants } from '../patterns/Card2Col'
import Card3Col, { card3ColVariants } from '../patterns/Card3Col'
import Links, { linksVariants } from '../patterns/Links'
import TeaserCarousel, {
  teaserCarouselVariants,
} from '../patterns/TeaserCarousel'
import TextColumn, { textColumnVariants } from '../patterns/TextColumn'
import TeaserHalfHalf, {
  teaserHaftHaftVariants,
} from '../patterns/TeaserHalfHalf'
import Graphics, { graphicsVariants } from '../patterns/Graphics'
import HubspotForm, { hubspotFormVariants } from '../patterns/HubspotForm'
import HubspotFormWithText, {
  hubspotFormWithTextVariants,
} from '../patterns/HubspotFormWithText'
import DvinciWidget, { dvinciWidgetVariants } from '../patterns/DvinciWidget'
/* CLI MARKER - PATTER IMPORT - DO NOT REMOVE */

export default [
  // EXAMPLE PAGES
  {
    type: 'page',
    name: 'Landing Page',
    component: Home,
    variants: [{ name: 'Home' }],
  },

  // PLACEABLE COMPONENTS
  {
    type: 'placeable',
    name: 'Card',
    component: Card,
    variants: cardVariants,
  },
  {
    type: 'placeable',
    name: 'Card (2 columns)',
    component: Card2Col,
    variants: card2ColVariants,
  },
  {
    type: 'placeable',
    name: 'Card (3 columns)',
    component: Card3Col,
    variants: card3ColVariants,
  },
  {
    type: 'placeable',
    name: 'Logo Bar',
    component: LogoBar,
    variants: logoBarVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser Simple',
    component: TeaserSimple,
    variants: teaserSimpleVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser Enhanced',
    component: TeaserEnhanced,
    variants: teaserEnhancedVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser Carousel',
    component: TeaserCarousel,
    variants: teaserCarouselVariants,
  },
  {
    type: 'placeable',
    name: 'Features with Icons',
    component: FeatureIcons,
    variants: featureIconsVariants,
  },
  {
    type: 'placeable',
    name: 'Simple Opener',
    component: SimpleOpener,
    variants: simpleOpenerVariants,
  },
  {
    type: 'placeable',
    name: 'CTA Opener',
    component: CTAOpener,
    variants: cTAOpenerVariants,
  },
  {
    type: 'placeable',
    name: 'CTA Trap',
    component: CTATrap,
    variants: cTATrapVariants,
  },
  {
    type: 'placeable',
    name: 'Stream',
    component: Stream,
    variants: streamVariants,
  },
  {
    type: 'placeable',
    name: 'Stream Simplify',
    component: StreamSimplify,
    variants: streamSimplifyVariants,
  },
  {
    type: 'placeable',
    name: 'Embedded Video',
    component: EmbeddedVideo,
    variants: embeddedVideoVariants,
  },
  {
    type: 'placeable',
    name: 'Forms',
    component: Forms,
    variants: formsVariants,
  },
  {
    type: 'placeable',
    name: 'HubspotForm',
    component: HubspotForm,
    variants: hubspotFormVariants,
  },
  {
    type: 'placeable',
    name: 'HubspotFormWithText',
    component: HubspotFormWithText,
    variants: hubspotFormWithTextVariants,
  },

  // STATIC COMPONENTS
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

  // ATOMS & MOLECULES
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
    type: 'atom',
    name: 'Input Icon',
    component: InputIcon,
    variants: inputIconVariants,
  },
  {
    type: 'atom',
    name: 'Tags',
    component: Tags,
    variants: tagsVariants,
  },

  {
    type: 'atom',
    name: 'Divider',
    component: Divider,
    variants: dividerVariants,
  },

  {
    type: 'molecule',
    name: 'Quotes',
    component: Quotes,
    variants: quotesVariants,
  },
  {
    type: 'atom',
    name: 'Avatar',
    component: Avatar,
    variants: avatarVariants,
  },
  {
    type: 'atom',
    name: 'User Info',
    component: UserInfo,
    variants: userInfoVariants,
  },

  {
    type: 'atom',
    name: 'Omr Reviews',
    component: OmrReviews,
    variants: omrReviewsVariants,
  },
  {
    type: 'molecule',
    name: 'USPs with Icons',
    component: USPsIcons,
    variants: uSPsIconsVariants,
  },
  {
    type: 'molecule',
    name: 'Links',
    component: Links,
    variants: linksVariants,
  },
  {
    type: 'placeable',
    name: 'Text Column',
    component: TextColumn,
    variants: textColumnVariants,
  },
  {
    type: 'molecule',
    name: 'Graphics',
    component: Graphics,
    variants: graphicsVariants,
  },
  {
    type: 'placeable',
    name: 'Teaser Half Half',
    component: TeaserHalfHalf,
    variants: teaserHaftHaftVariants,
  },
  {
    type: 'atom',
    name: 'Elevation',
    component: Elevation,
    variants: elevationVariants,
  },

  {
    type: 'placeable',
    name: 'Dvinci Widget',
    component: DvinciWidget,
    variants: dvinciWidgetVariants,
  },
  /* CLI MARKER - PATTERN CONFIG - DO NOT REMOVE */
]
