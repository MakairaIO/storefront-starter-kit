import { dispatchUpdateCartEvent } from '..'

export default async function addToCart({ id, quantity = 1 }) {
  const url = new URL(
    `${process.env.FAILOVER_URL}/public/flourshop/addToBasket`
  )
  url.search = new URLSearchParams([
    ['articleId', id],
    ['amount', quantity],
  ]).toString()

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) return false

    const result = await response.json()

    // TODO: Add proper error-handling
    dispatchUpdateCartEvent(result)
  } catch (e) {
    return false
  }

  return true
}
