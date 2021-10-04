import { toast } from 'react-toastify'

export default function addToCart(id = '', quantity = 1) {
  const url = new URL(
    `${process.env.FAILOVER_URL}/public/flourshop/addToBasket`
  )
  const params = { articleId: id, amount: quantity }
  url.search = new URLSearchParams(params).toString()

  toast.promise(add(url), {
    pending: '...',
    success:
      quantity > 1
        ? `${quantity} Produkte wurden in den Warenkorb gelegt 👌`
        : 'Das Produkt wurde in den Warenkorb gelegt 👌',
    error: 'Fehler: Das Produkt konnte nicht in den Warenkorb gelegt werden',
  })
}

function add(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error()
      }
    })
    .then((data) => {
      if (data.error) {
        throw new Error()
      }
      localStorage.setItem('cart', JSON.stringify(data))
      window.dispatchEvent(new Event('storage'))
    })
}
