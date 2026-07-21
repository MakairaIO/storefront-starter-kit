import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateNonce,
  generateState,
} from './challenge'

export async function prepareAuthorizationUrl() {
  const authorizationRequestUrl = new URL(
    process.env.NEXT_PUBLIC_SHOPIFY_AUTH_BASE_URL + '/oauth/authorize'
  )

  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_AUTH_CLIENT_ID
  const redirectUri = process.env.NEXT_PUBLIC_SHOP_DOMAIN + '/auth/callback'
  const state = await generateState()
  const nonce = await generateNonce(16)

  authorizationRequestUrl.searchParams.append(
    'scope',
    'openid email customer-account-api:full'
  )
  authorizationRequestUrl.searchParams.append('client_id', clientId)
  authorizationRequestUrl.searchParams.append('response_type', 'code')
  authorizationRequestUrl.searchParams.append('redirect_uri', redirectUri)
  authorizationRequestUrl.searchParams.append('state', state)
  authorizationRequestUrl.searchParams.append('nonce', nonce)

  // PKCE: Public client flow
  const verifier = await generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem('code-verifier', verifier)

  authorizationRequestUrl.searchParams.append('code_challenge', challenge)
  authorizationRequestUrl.searchParams.append('code_challenge_method', 'S256')

  return authorizationRequestUrl.toString()
}
