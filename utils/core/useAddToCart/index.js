import { useCallback, useState } from 'react'
import fetchRecommendationData from '../fetchRecommendationData'
import { useTranslation } from '../TranslationProvider'
import { GTM, prepareTrackingItem } from '../../index'
import { useShopClient } from '@makaira/storefront-react'

export const ADD_TO_CART_DISPATCH_EVENT_NAME = 'addToCart:success'

export default function useAddToCart() {
  const { language } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { client } = useShopClient()

  const addToCart = useCallback(
    async (
      { product, activeVariant, quantity },
      { skipRecommendations, skipPopup } = {
        skipRecommendations: false,
        skipPopup: false,
      }
    ) => {
      setLoading(true)

      try {
        const promises = [
          await client.cart.addItem({
            input: {
              quantity,
              product,
              images: product.images,
              price: product.price,
              title: product.title,
              url: product.url,
            },
          }),
        ]

        if (skipRecommendations !== true) {
          promises.push(
            fetchRecommendationData({
              productId: product.id,
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
              items: [prepareTrackingItem(activeVariant, quantity)],
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
    [client.cart, language]
  )

  return { loading, addToCart }
}
