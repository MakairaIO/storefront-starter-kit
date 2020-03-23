export default function getFullUrl(url = '') {
  if (url.startsWith('http')) {
    return url
  }

  if (url.startsWith('www')) {
    return 'https://' + url
  }

  /**
   * Rest of the function handles relative URLs
   */
  const domain = process.env.SHOP_DOMAIN
  const normalizedDomain = domain.replace(/\/$/, '') // replace trailing slash

  if (url == '/') {
    return normalizedDomain + '/'
  }

  const normalizedPath = url
    .replace(/^\//, '') // replace leading slash from path
    .replace(/\/\/+/g, '/') // replace double slashes

  return normalizedDomain + '/' + normalizedPath
}
