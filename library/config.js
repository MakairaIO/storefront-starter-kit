import Header, { headerVariants } from '../patterns/Header'

import Home from './examplePages/Home'

export default [
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
