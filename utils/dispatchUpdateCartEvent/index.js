export default function dispatchUpdateCartEvent(cart) {
  const updateCartEvent = new CustomEvent('update:cart', {
    detail: { cart },
  })

  window.dispatchEvent(updateCartEvent)
}
