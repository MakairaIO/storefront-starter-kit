import { useCallback, useState } from 'react'
import fetchRecommendationData from '../fetchRecommendationData'
import { useTranslation } from '../TranslationProvider'

export const ADD_TO_CART_DISPATCH_EVENT_NAME = 'addToCart:success'

export default function useAddToCart() {
  const { language } = useTranslation()
  const [loading, setLoading] = useState(false)

  const addToCart = useCallback(
    async (
      { productId },
      { skipRecommendations, skipPopup } = {
        skipRecommendations: false,
        skipPopup: false,
      }
    ) => {
      setLoading(true)

      try {
        const promises = [new Promise((resolve) => setTimeout(resolve, 500))]

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
