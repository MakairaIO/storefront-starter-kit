import { parseCookies } from 'nookies'

export default function getClientInformation() {
  const { origin, pathname, search } = window.location
  const { platform, userAgent } = window.navigator
  const { ip } = parseCookies()
  const hashedIp = window.btoa(ip)

  return {
    Host: origin,
    Path: pathname,
    queryString: search,
    Platform: platform,
    'User-Agent': userAgent,
    CustomerIP: hashedIp,
  }
}
