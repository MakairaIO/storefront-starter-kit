import Heading, { headingVariants } from '../patterns/Heading'
import Copytext, { copytextVariants } from '../patterns/Copytext'
import Button, { buttonVariants } from '../patterns/Button'
import Header, { headerVariants } from '../patterns/Header'
import TeaserSingle, { teaserSingleVariants } from '../patterns/TeaserSingle'
import ProductList, { productListVariants } from '../patterns/ProductList'

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
    name: 'Teaser (Single)',
    component: TeaserSingle,
    variants: teaserSingleVariants,
  },
  {
    type: 'component',
    name: 'Product List',
    component: ProductList,
    variants: productListVariants,
  },
  {
    type: 'page',
    name: 'Landing Page',
    component: Home,
    variants: [{ name: 'Beispiel Seite' }],
  },
]
