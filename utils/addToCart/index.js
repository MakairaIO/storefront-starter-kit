import { dispatchUpdateCartEvent } from '..'

export default async function addToCart({ id, quantity = 1 }) {
  const body = {
    variantId: id,
    quantity,
  }

  const response = await fetch('/rest/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Makaira-Instance': process.env.MAKAIRA_API_INSTANCE,
    },
    body: JSON.stringify(body),
  })

  const result = await response.json()

  const { success, cart } = result

  // TODO: Add proper error-handling
  if (success) dispatchUpdateCartEvent(cart)

  return success
}
