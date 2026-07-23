const FETCH_CUSTOMER_QUERY = `
  query {
    customer {
      id
      firstName
      lastName
      emailAddress { emailAddress }
    }
  }
`

export default async function getCustomerData(accessToken) {
  const url = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify({
      query: FETCH_CUSTOMER_QUERY,
      variables: {},
    }),
  })

  const data = await response.json()

  return data
}
