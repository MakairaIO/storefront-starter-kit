import Heading, { headingVariants } from '../patterns/Heading'
import Copytext, { copytextVariants } from '../patterns/Copytext'
import Button, { buttonVariants } from '../patterns/Button'
import Header, { headerVariants } from '../patterns/Header'
import SingleTeaser, { singleTeaserVariants } from '../patterns/SingleTeaser'

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
    component: SingleTeaser,
    variants: singleTeaserVariants,
  },
  {
    type: 'page',
    name: 'Landing Page',
    component: Home,
    variants: [{ name: 'Beispiel Seite' }],
  },
]
