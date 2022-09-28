export default function getStructureData(
  product = {},
  images = [],
  currency = ''
) {
  const { country = {}, region = {} } = product

  // TODO: Add reviews to structure data
  let structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    brand: {
      '@type': 'Brand',
      name: product.manufacturer_title,
    },
    name: product.title,
    description: product.longdesc,
    sku: product.id,
    gtin: product.ean,
    image: images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      availability: product.onstock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: currency,
    },
    manufacturer: {
      '@type': 'Organization',
      url: `${process.env.SHOP_DOMAIN}/ ${
        (product?.producer?.url || '').startsWith('/')
          ? (product?.producer?.url || '').substr(1)
          : product?.producer?.url || ''
      }`,
      address: region?.title,
    },
    url: `${process.env.SHOP_DOMAIN}/${
      (product?.url || '').startsWith('/')
        ? (product?.url || '').substr(1)
        : product?.url || ''
    }`,
    country: country?.title,
  }

  return JSON.stringify(structuredData)
}
