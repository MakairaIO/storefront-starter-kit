import Heading, { headingVariants } from '../patterns/Heading'
import Copytext, { copytextVariants } from '../patterns/Copytext'
import Header, { headerVariants } from '../patterns/Header'

import Home from './examplePages/Home'

export default [
  {
    type: 'component',
    name: 'Heading',
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
    name: 'Header',
    component: Header,
    variants: headerVariants,
  },
  {
    type: 'page',
    name: 'Landing Page',
    component: Home,
    variants: [{ name: 'Beispiel Seite' }],
  },
]
