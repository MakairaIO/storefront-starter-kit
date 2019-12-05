import pageConfig from '../pageComponents/config'
import Header, { headerVariants } from './Header'

export default [
  {
    type: 'component',
    name: 'Header',
    component: Header,
    variants: headerVariants,
  },
  ...pageConfig,
]
