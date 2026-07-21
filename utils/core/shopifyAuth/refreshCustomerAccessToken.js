import { setCookie } from 'nookies'

export default async function refreshCustomerAccessToken(refreshToken) {
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_AUTH_CLIENT_ID
  const body = new URLSearchParams()

  body.append('grant_type', 'refresh_token')
  body.append('client_id', clientId)
  body.append('refresh_token', refreshToken)

  const response = await fetch(
    process.env.NEXT_PUBLIC_SHOPIFY_AUTH_BASE_URL + '/oauth/token',
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    }
  )

  const { access_token, refresh_token, expires_in } = await response.json()

  setCookie(null, 'shopify_access_token', access_token, {
    path: '/',
    maxAge: expires_in,
    secure: process.env.NODE_ENV === 'production',
  })

  setCookie(null, 'shopify_refresh_token', refresh_token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
  })

  return access_token
}
