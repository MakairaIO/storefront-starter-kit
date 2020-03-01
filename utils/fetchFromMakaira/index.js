import fetch from 'isomorphic-unfetch'

export default async function fetchFromMakaira(body) {
  let url = process.env.MAKAIRA_API_URL

  if (body.isSearch) {
    url += '/search/public'
  } else {
    url += '/enterprise/page'
  }

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Makaira-Instance': process.env.MAKAIRA_API_INSTANCE,
    },
    body: JSON.stringify(body),
  })

  if (response.status !== 200) {
    const { status, statusText } = response
    const errorBody = await response.json()

    const error = new Error()
    error.code = status
    error.message = statusText
    error.cause = errorBody.message
    error.stack = 'fetchFromMakaira()'

    throw error
  }

  return response.json()
}
