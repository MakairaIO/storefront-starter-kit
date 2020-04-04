import cloneDeep from 'lodash/cloneDeep'

export default function mergeProductsAndBanners({
  products = [],
  banners = [],
}) {
  if (banners.length == 0) return products

  if (products.length == 0) return banners

  // We do not want to mutate the original input
  let merged = cloneDeep(products)

  const sortedBanners = banners.map(normalizeBanner).sort(byPosition)

  sortedBanners.forEach((banner) => {
    let indexToInsertAt = banner.position - 1 // -1 offset here since arrays start at index 0, right :)

    const modifiedBanner = { ...banner, isBanner: true }

    merged.splice(indexToInsertAt, 0, modifiedBanner)
  })

  return merged
}

function normalizeBanner(banner) {
  if (banner.position > 0) return banner

  return { ...banner, position: 1 }
}

function byPosition(a, b) {
  return a.position - b.position
}
