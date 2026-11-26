import { useShopClient } from '@makaira/storefront-react'
import { useTranslation } from '../TranslationProvider'
import { useCallback, useState } from 'react'
import fetchRecommendationData from '../fetchRecommendationData'
import { GTM, prepareTrackingItem } from '../../index'

export const ADD_TO_CART_DISPATCH_EVENT_NAME = 'addToCart:success'

export default function useAddToCart() {
  const { client } = useShopClient()
  const { language } = useTranslation()
  const [loading, setLoading] = useState(false)

  const addToCart = useCallback(
    async (
      product,
      quantity,
      { skipRecommendations, skipPopup } = {
        skipRecommendations: false,
        skipPopup: false,
      }
    ) => {
      setLoading(true)

      try {
        const variants = product['makaira-product']
        const variant =
          product.activeVariant ??
          (Array.isArray(variants) ? variants[0] : variants)
        // Shopify needs the variant id; it must win over the product's own `id`.
        const variantId = variant?.id ?? product.productId ?? product.id

        const promises = [
          client.cart.addItem({
            input: {
              product: { ...product, id: variantId },
              quantity,
            },
          }),
        ]

        if (skipRecommendations !== true) {
          promises.push(
            fetchRecommendationData({
              productId: product.productId,
              language,
              recommendationId: 'similar-products',
            })
          )
        }

        const [addToCartResponse, recommendationResponse] =
          await Promise.allSettled(promises)

        setLoading(false)

        if (addToCartResponse.status === 'fulfilled') {
          GTM.trackEvent({
            event: 'add_to_cart',
            ecommerce: {
              items: [
                prepareTrackingItem(
                  variant ?? {
                    id: variantId,
                    title: product.title,
                    price: product.price,
                  },
                  quantity
                ),
              ],
            },
            _clear: true,
          })

          if (skipPopup !== true) {
            window.dispatchEvent(
              new MessageEvent(ADD_TO_CART_DISPATCH_EVENT_NAME, {
                data: {
                  recommendations: recommendationResponse?.value,
                  addToCart: addToCartResponse.value,
                },
              })
            )
          }

          return {
            error: false,
            recommendations: recommendationResponse?.value,
            addToCart: addToCartResponse.value,
          }
        }

        return { error: true, recommendations: undefined, addToCart: undefined }
      } catch (_e) {
        setLoading(false)

        return { error: true, recommendations: undefined, addToCart: undefined }
      }
    },
    [client.cart, language, setLoading]
  )

  return { loading, addToCart }
}
