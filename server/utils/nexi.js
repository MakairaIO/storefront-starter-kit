module.exports = {
  transformNexiItems: (items = []) => {
    const quantity = 1
    const taxAmount = 0 // TODO: tax correctly
    return items.map((item) => ({
      name: item.title,
      reference: item.id,
      quantity,
      unit: 'Stk',
      unitPrice: item.price * 100, // nexi treats prices as cents
      netTotalAmount: item.price * quantity * 100,
      grossTotalAmount: (item.price * quantity + taxAmount) * 100,
    }))
  },
  fetchItems: async (items = []) => {
    const ids = items.map((item) => item.id)
    const url = `${process.env.MAKAIRA_API_URL}/documents/public`
    const response = await fetch(url, {
      headers: {
        contentType: 'application/json',
        'X-Makaira-Instance': process.env.MAKAIRA_API_INSTANCE,
      },
      method: 'POST',
      body: JSON.stringify({
        ids,
        datatype: 'makaira-productgroup',
        constraints: {
          'query.language': 'de',
        },
        includeContent: false,
      }),
    })

    return response.json()
  },
  fetchNexiCheckout: async () => {
    const url = `${process.env.NEXI_CHECKOUT_API_URL}`
    const response = await fetch(url)
    return response.json()
  },
}
