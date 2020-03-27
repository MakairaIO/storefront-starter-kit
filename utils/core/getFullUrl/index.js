export default function getFullUrl(url = '') {
  const domain = process.env.SHOP_DOMAIN
  const normalizedDomain = domain.replace(/\/$/, '') // replace trailing slash

  let normalizedInput
  if (url.startsWith('http')) {
    normalizedInput = url
  }

  if (url.startsWith('www')) {
    normalizedInput = 'https://' + url
  }

  if (url.startsWith('/')) {
    normalizedInput = normalizedDomain + url
  }

  if (url == '') {
    normalizedInput = normalizedDomain + '/'
  }

  let fullUrl, isExternalLink
  if (normalizedInput?.includes(domain)) {
    isExternalLink = false

    fullUrl = processInternalUrl(normalizedInput)
  } else {
    isExternalLink = true

    fullUrl = normalizedInput
  }

  return { fullUrl, isExternalLink }
}

function processInternalUrl(url) {
  const domain = process.env.SHOP_DOMAIN
  const normalizedDomain = domain.replace(/\/$/, '') // replace trailing slash

  const path = url.replace(normalizedDomain, '')
  const normalizedPath = path
    .replace(/^\//, '') // replace leading slash from path
    .replace(/\/\/+/g, '/') // replace double slashes

  return normalizedDomain + '/' + normalizedPath
}
