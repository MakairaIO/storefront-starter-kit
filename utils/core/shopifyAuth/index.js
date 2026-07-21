import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import { parseCookies, destroyCookie } from 'nookies'
import { ShopProvider } from '@makaira/storefront-react'
import { StorefrontShopAdapterShopify } from '@makaira/storefront-shop-adapter-shopify'
import { prepareAuthorizationUrl } from './prepareAuthorizationUrl'
import getCustomerAccessToken from './getCustomerAccessToken'
import refreshCustomerAccessToken from './refreshCustomerAccessToken'
import getCustomerData from './getCustomerData'

const ShopifyAuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
})

function ShopifyAuthProvider({ children }) {
  const { query } = useRouter()
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const validateToken = useCallback(async (code) => {
    try {
      const token = await getCustomerAccessToken(code)
      const customerData = await getCustomerData(token)

      const customer = customerData?.data?.customer

      if (customer) {
        setUser({
          firstname: customer.firstName || '',
          lastname: customer.lastName || '',
          email: customer.emailAddress?.emailAddress || '',
          id: customer.id || '',
        })
      }

      setAccessToken(token)
      window.location.href = '/'
    } catch (error) {
      console.error('Shopify auth error:', error)
      window.location.href = '/'
    }
  }, [])

  const optionallyRefreshToken = useCallback(async () => {
    const { shopify_access_token: storedAccessToken, shopify_refresh_token } =
      parseCookies()

    if (!shopify_refresh_token) return

    let token = storedAccessToken

    if (!token) {
      try {
        token = await refreshCustomerAccessToken(shopify_refresh_token)
      } catch (error) {
        console.error('Token refresh failed:', error)
        return
      }
    }

    try {
      const customerData = await getCustomerData(token)
      const customer = customerData?.data?.customer

      if (customer) {
        setUser({
          firstname: customer.firstName || '',
          lastname: customer.lastName || '',
          email: customer.emailAddress?.emailAddress || '',
          id: customer.id || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch customer data:', error)
    }

    setAccessToken(token)
  }, [])

  useEffect(() => {
    async function initialize() {
      const code = query?.code

      if (code) {
        await validateToken(code)
      } else {
        await optionallyRefreshToken()
        setInitialized(true)
      }
    }

    initialize()
  }, [validateToken, optionallyRefreshToken, query?.code])

  const login = useCallback(async () => {
    const url = await prepareAuthorizationUrl()
    window.location.href = url
  }, [])

  const logout = useCallback(() => {
    destroyCookie(null, 'shopify_access_token', { path: '/' })
    destroyCookie(null, 'shopify_refresh_token', { path: '/' })
    localStorage.removeItem('code-verifier')
    setAccessToken(null)
    setUser(null)
    window.location.href = '/'
  }, [])

  const shopClient = useMemo(() => {
    return new StorefrontShopAdapterShopify({
      url:
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL ||
        process.env.STOREFRONT_DOMAIN,
      accessToken:
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
        process.env.STOREFRONT_API_KEY,
    })
  }, [accessToken])

  return (
    <ShopifyAuthContext.Provider
      value={{
        user: initialized ? user : null,
        isAuthenticated: initialized ? !!user : false,
        login,
        logout,
      }}
    >
      <ShopProvider client={shopClient}>{children}</ShopProvider>
    </ShopifyAuthContext.Provider>
  )
}

function useShopifyAuth() {
  return useContext(ShopifyAuthContext)
}

export default ShopifyAuthContext
export { ShopifyAuthContext, ShopifyAuthProvider, useShopifyAuth }
