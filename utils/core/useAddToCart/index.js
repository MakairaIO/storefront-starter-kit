import { useShopClient } from '@makaira/storefront-react'
import { useCallback, useState } from 'react'
import fetchRecommendationData from '../fetchRecommendationData'
import { useTranslation } from '../TranslationProvider'

export const ADD_TO_CART_DISPATCH_EVENT_NAME = 'addToCart:success'

export default function useAddToCart() {
  const { client } = useShopClient()
  const { language } = useTranslation()
  const [loading, setLoading] = useState(false)

  const addToCart = useCallback(
    async (
      { productId, images, price, title, url },
      { skipRecommendations, skipPopup } = {
        skipRecommendations: false,
        skipPopup: false,
      }
    ) => {
      setLoading(true)

      try {
        const promises = [
          client.cart.addItem({
            input: {
              quantity: 1,
              product: { id: productId },
              images,
              price,
              title,
              url,
            },
          }),
        ]

        if (skipRecommendations !== true) {
          promises.push(
            fetchRecommendationData({
              productId,
              language,
              recommendationId: 'similar-products',
            })
          )
        }

        const [addToCartResponse, recommendationResponse] =
          await Promise.allSettled(promises)

        setLoading(false)

        if (addToCartResponse.status === 'fulfilled') {
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
    [language, setLoading]
  )

  return { loading, addToCart }
}
