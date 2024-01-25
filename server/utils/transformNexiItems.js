module.exports = function transformNexiItems(items = []) {
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
}
