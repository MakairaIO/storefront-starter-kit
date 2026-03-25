# Migrate storefront-starter-kit to Shopify Customer Account API (OAuth PKCE)

## Context

Shopify has deprecated Legacy/Classic Customer Accounts as of February 2026. The old login flow (username/password via Storefront API `customerAccessTokenCreate`) will be shut down at a date to be announced later in 2026. Legacy accounts no longer receive feature updates or technical support.

The storefront-starter-kit previously used `@makaira/storefront-shop-adapter-local` with a classic `client.user.login({ username, password })` pattern. This has been migrated to the new Shopify Customer Account API using OAuth 2.0 with PKCE (Proof Key for Code Exchange).

Reference: The Taschen storefront (`@makaira/storefront-shop-adapter-shopify@^2.1.0`) already implements this flow in production with a B2B/B2C multi-region setup. The starter-kit implementation is a simplified, generic version of the same approach.

## What has been done

### New files created

| File | Purpose |
|------|---------|
| `utils/core/shopifyAuth/challenge.js` | PKCE crypto utilities: generates code verifier, code challenge (SHA-256), state, and nonce using the Web Crypto API |
| `utils/core/shopifyAuth/prepareAuthorizationUrl.js` | Constructs the Shopify OAuth authorization URL with all required params (scope, PKCE challenge, redirect URI) |
| `utils/core/shopifyAuth/getCustomerAccessToken.js` | Exchanges the authorization code for access + refresh tokens, stores them as cookies via `nookies` |
| `utils/core/shopifyAuth/refreshCustomerAccessToken.js` | Uses the refresh token grant to obtain a new access token when the previous one has expired |
| `utils/core/shopifyAuth/getCustomerData.js` | Fetches customer data (id, firstName, lastName, email) from the Customer Account API via GraphQL |
| `utils/core/shopifyAuth/index.js` | **`ShopifyAuthProvider`** (React context provider) and **`useShopifyAuth`** hook. This is the central piece that manages the entire OAuth lifecycle, token state, and wraps children in `ShopProvider` |
| `pages/frontend/auth/callback.js` | OAuth callback page that renders a loading spinner while the ShopifyAuthProvider processes the authorization code |

### Modified files

| File | Change |
|------|--------|
| `package.json` | Added `@makaira/storefront-shop-adapter-shopify@^2.1.0` dependency |
| `.env.example` | Documented 6 new Shopify environment variables |
| `next.config.js` | Added rewrite rule `/auth/callback` -> `/frontend/auth/callback` (before the catch-all) |
| `index.d.ts` | Updated type declaration from `StorefrontShopAdapterLocal` to `StorefrontShopAdapterShopify` |
| `server/index.js` | Added `/auth/callback` express route before the catch-all `*` handler |
| `utils/index.js` | Added exports for `ShopifyAuthContext`, `ShopifyAuthProvider`, `useShopifyAuth` |
| `pages/frontend/entry.js` | Replaced `ShopProvider` + `StorefrontShopAdapterLocal` with `ShopifyAuthProvider` |
| `pages/frontend/search.js` | Same replacement as entry.js |
| `pages/frontend/preview.js` | Same replacement as entry.js |
| `patterns/core/Header/User/LoginForm.js` | Replaced username/password form with a single login button that triggers the OAuth redirect via `useShopifyAuth().login()` |
| `patterns/core/Header/User/LoginBox.js` | Replaced `useShopUser` with `useShopifyAuth`, removed password-forgot state and PasswordForgotForm import |
| `patterns/core/Header/User/UserForm.js` | Replaced `useShopClient().client.user.logout()` with `useShopifyAuth().logout()` |
| `utils/core/translations/locales/de.js` | Removed 8 obsolete translation keys (LOGIN_ERROR, LOGIN_FORGOT_PASSWORD_*, LOGIN_EMAIL_LABEL, LOGIN_BACK_TO_LOGIN, LOGIN_SUCCESS) |
| `utils/core/translations/locales/en.js` | Same removals as de.js |
| `patterns/core/Header/User/loginBox.styl` | Removed `.login-box__forgot-password` styles |

### Deleted files

| File | Reason |
|------|--------|
| `patterns/core/Header/User/PasswordForgotForm.js` | No longer needed. Password reset is handled by Shopify's hosted login page |

### Intentionally unchanged

| File | Reason |
|------|--------|
| `pages/library/variant.js` | Pattern library page, uses `StorefrontShopAdapterLocal` for development without requiring Shopify credentials |
| `library/internal/VariantPreview.js` | Same as above |

### How the new auth flow works

1. User clicks "Login" button -> `prepareAuthorizationUrl()` generates PKCE code verifier + challenge, stores verifier in `localStorage`, and redirects to Shopify's hosted login page
2. User authenticates on Shopify (passwordless: email + one-time code)
3. Shopify redirects back to `/auth/callback?code=...`
4. `ShopifyAuthProvider` detects the `?code=` query param, exchanges it for access + refresh tokens via `POST /oauth/token`
5. Tokens are stored as cookies (`shopify_access_token`, `shopify_refresh_token`)
6. Customer data is fetched from the Customer Account API (GraphQL)
7. User state is set in context, page redirects to `/`
8. On subsequent page loads: if access token cookie is missing but refresh token exists, the provider silently refreshes
9. Logout: destroys cookies, clears localStorage, redirects to `/`

---
### Acceptance Criteria
- [ ] `npm install` completes without errors
- [ ] Clicking the login button redirects to Shopify's hosted login page
- [ ] After authenticating on Shopify, the user is redirected back to `/` and is logged in (user name displayed in header)
- [ ] Page refresh preserves the login state (tokens are read from cookies)
- [ ] Token refresh works: manually delete the `shopify_access_token` cookie, refresh the page -> user stays logged in (refresh token is used)
- [ ] Logout clears all Shopify cookies and resets the user state
- [ ] Cart and wishlist functionality still works via `useShopClient()` (these hooks are provided by `ShopProvider` inside `ShopifyAuthProvider`)
- [ ] The pattern library (`/pali`) still works without Shopify credentials (uses local adapter)
- [ ] Search page (`/search`, `/suche`) works with the new auth provider
- [ ] Preview page (`/preview`) works with the new auth provider

---
### DoD
- [ ] ACs are done and checked
- [ ] Changes are deployed on stage

---
### Testing Notes

#### Prerequisites

1. Run `npm install` to install the new `@makaira/storefront-shop-adapter-shopify` dependency
2. Set up a Shopify store with the **new Customer Accounts** enabled (Settings -> Customer accounts -> select "New customer accounts")
3. Create a **Headless** app for the Customer Account API in Shopify Admin (Settings -> Apps -> Develop apps, or Settings -> Customer accounts -> Account API integrations)
4. Configure the following in `.env` (copy from `.env.example`):

```
NEXT_PUBLIC_SHOPIFY_AUTH_BASE_URL=https://shopify.com/<shop-id>
NEXT_PUBLIC_SHOPIFY_AUTH_CLIENT_ID=<client-id-from-shopify-app>
NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL=https://shopify.com/<shop-id>/account/customer/api/2024-01/graphql
NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL=https://<shop>.myshopify.com/api/2024-01/graphql.json
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<storefront-api-access-token>
NEXT_PUBLIC_SHOP_DOMAIN=http://localhost:5000
```

5. In the Shopify app settings, add `http://localhost:5000/auth/callback` as an allowed redirect URI

#### Test steps

1. **Login flow**: Click the login button in the header -> verify redirect to Shopify -> authenticate -> verify redirect back to `/` -> verify user name shown in header
2. **Persistent session**: Refresh the page -> verify user is still logged in
3. **Token refresh**: Open browser dev tools -> Application -> Cookies -> delete `shopify_access_token` (keep `shopify_refresh_token`) -> refresh page -> verify user is still logged in
4. **Logout**: Click logout -> verify cookies are cleared -> verify user state is reset -> verify redirect to `/`
5. **Cart**: Add a product to cart -> verify cart popup/flyout works
6. **Pattern library**: Navigate to `/pali` -> verify it loads without errors (uses local adapter, no Shopify needed)
7. **Auth callback error handling**: Navigate directly to `/auth/callback` without a code param -> verify no crash, redirects or shows page normally

#### Using a Shopify Partner dev store (free)

If no production store is available, create a free dev store via https://partners.shopify.com. Dev stores support the full Customer Account API.

---
### Deployment Notes

1. The following environment variables **must** be configured on the stage/production environment before deployment:
   - `NEXT_PUBLIC_SHOPIFY_AUTH_BASE_URL`
   - `NEXT_PUBLIC_SHOPIFY_AUTH_CLIENT_ID`
   - `NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `NEXT_PUBLIC_SHOP_DOMAIN` (must match the actual domain, e.g., `https://storefront.example.com`)
2. The Shopify app's allowed redirect URIs must include the production callback URL: `https://<production-domain>/auth/callback`
3. `npm install` must be run to install the new `@makaira/storefront-shop-adapter-shopify` package
4. The `@makaira/storefront-shop-adapter-local` package is intentionally kept as a dependency for the pattern library

---
### Post deploy/publish ToDos

- Inform customers using the Shopify adapter that they need to:
  1. Enable the new Customer Accounts in their Shopify store (Settings -> Customer accounts)
  2. Set up a Headless Customer Account API app
  3. Update their environment variables (see Deployment Notes)
  4. Add their production domain's `/auth/callback` URL to the Shopify app's allowed redirect URIs
- Communicate the deprecation timeline: Shopify deprecated legacy accounts in Feb 2026, final shutdown date TBA later in 2026
- Note: the Taschen storefront already runs on this flow successfully (using `@makaira/storefront-shop-adapter-shopify@^2.1.0`) — this validates the approach
- Side note for Taschen: there is a bug in their `utils/b2c/refreshCustomerAccessToken.ts` that uses B2B environment variables instead of B2C variables — this should be reported separately

---
### Pull Request & Commits
> Put the link to the merge request here!
