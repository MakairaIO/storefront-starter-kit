import '@makaira/storefront-react'
import { StorefrontShopAdapterLocal } from '@makaira/storefront-shop-adapter-local'

declare module '@makaira/storefront-react' {
  interface StorefrontReactCustomClient {
    client: StorefrontShopAdapterLocal
  }
}
