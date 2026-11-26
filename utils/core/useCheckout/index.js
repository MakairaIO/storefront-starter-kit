import { useShopClient } from '@makaira/storefront-react'
import { useCallback, useState } from 'react'

export function getCheckoutUrl(raw = {}) {
  return (
    raw.getCheckout?.data?.node?.checkoutUrl ||
    raw.createCheckout?.data?.cartCreate?.cart?.checkoutUrl
  )
}

export default function useCheckout() {
  const { client } = useShopClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const goToCheckout = useCallback(async () => {
    setLoading(true)
    setError(false)

    let url
    try {
      const { raw, error: cartError } = await client.cart.getCart()
      url = cartError ? undefined : getCheckoutUrl(raw)
      if (!url) console.error('Shopify checkout unavailable:', cartError)
    } catch (e) {
      console.error('Shopify checkout unavailable:', e)
    }

    if (!url) {
      setError(true)
      setLoading(false)
      return
    }

    window.location.href = url
  }, [client])

  return { loading, error, goToCheckout }
}
