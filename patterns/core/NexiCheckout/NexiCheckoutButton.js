import { useRouter } from 'next/router'
import Button from '../Button'

export function NexiCheckoutButton(props) {
  const { push } = useRouter()
  async function initNexiCheckout() {
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if ('errors' in data) {
        throw new Error(JSON.stringify(data.errors, null, 2))
      }

      push(`/checkout?checkoutId=${data.paymentId}`)
    } catch (e) {
      // TODO: handle error gracefully :)
      console.error(e)
    }
  }

  return <Button onClick={initNexiCheckout}>Direct Checkout</Button>
}
