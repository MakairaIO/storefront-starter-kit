import Heading, { headingVariants } from '../patterns/core/Heading'
import Copytext, { copytextVariants } from '../patterns/core/Copytext'
import Button, { buttonVariants } from '../patterns/core/Button'
import Header, { headerVariants } from '../patterns/core/Header'
import TeaserHero, { teaserHeroVariants } from '../patterns/core/TeaserHero'
import TeaserSingle, {
  teaserSingleVariants,
} from '../patterns/core/TeaserSingle'
import MultiColumnText, {
  multiColumnTextVariants,
} from '../patterns/core/MultiColumnText'
import ProductList, { productListVariants } from '../patterns/core/ProductList'

import Home from './examplePages/Home'

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
    name: 'Text (mehrspaltig)',
    component: MultiColumnText,
    variants: multiColumnTextVariants,
  },
  {
    type: 'page',
    name: 'Landing Page',
    component: Home,
    variants: [{ name: 'Beispiel Seite' }],
  },
]
