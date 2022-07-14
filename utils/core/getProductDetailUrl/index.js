import qs from 'qs'

export default function getProductDetailUrl({ url, pageData }) {
  if (pageData?.type === 'bundle') {
    const queryString = qs.stringify({
      redirectBundleId: pageData.data?.self?.id,
    })
    return `${Array.isArray(url) ? url[0] : url}?${queryString}`
  }

  if (Array.isArray(url)) {
    return url[0]
  }

  return url
}
