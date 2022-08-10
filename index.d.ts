import '@makaira/storefront-react'
import { StorefrontShopAdapterShopify } from '@makaira/storefront-shop-adapter-shopify'

declare module '@makaira/storefront-react' {
  interface StorefrontReactCustomClient {
    client: StorefrontShopAdapterShopify
  }
}
