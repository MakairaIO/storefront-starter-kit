export default function prepareTrackingItem(product, quantity) {
  const item = {
    item_id: product.id || product.articleNumber,
    item_name: product.title,
    affiliation: 'makaira',
    currency: 'EUR',
    item_brand: product.manufacturer_title,
    price: parseInt(product.price, 10) || product.price,
    quantity: quantity || product.quantity || 1,
  }

  if (product.category?.length > 0) {
    product.category.forEach((category, i) => {
      const number = i > 0 ? i + 1 : ''
      item[`ìtem_category${number}`] = category.catid
    })
  }

  return item
}
