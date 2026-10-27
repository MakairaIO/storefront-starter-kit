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

  const goToCheckout = useCallback(async () => {
    setLoading(true)

    const { raw, error } = await client.cart.getCart()
    const url = getCheckoutUrl(raw)

    if (error || !url) {
      console.error('Shopify checkout unavailable:', error)
      setLoading(false)
      return
    }

    window.location.href = url
  }, [client])

  return { loading, goToCheckout }
}
