import { StorefrontShopAdapterShopify } from '@makaira/storefront-shop-adapter-shopify'

const shopClient = new StorefrontShopAdapterShopify({
  url: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL,
  accessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
})

export default shopClient
