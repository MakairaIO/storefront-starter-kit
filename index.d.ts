import '@makaira/storefront-react'
import { StorefrontShopAdapterOxid } from '@makaira/storefront-shop-adapter-oxid'

declare module '@makaira/storefront-react' {
  interface StorefrontReactCustomClient {
    client: StorefrontShopAdapterOxid
  }
}
