import qs from 'qs'

export default function getProductDetailUrl({ url, pageData }) {
  if (pageData?.type === 'bundle') {
    const queryString = qs.stringify({
      redirectBundleId: pageData.data?.self?.id,
    })
    return `${url}?${queryString}`
  }

  return url
}
