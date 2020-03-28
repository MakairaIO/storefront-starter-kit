import fetch from 'isomorphic-unfetch'

function getEndpoint({ isSearch, isSnippet }) {
  let url = process.env.MAKAIRA_API_URL

  if (isSearch) return url + '/search/public'

  if (isSnippet) return url + '/enterprise/snippets'

  return url + '/enterprise/page'
}

export default async function fetchFromMakaira({
  body,
  isSearch = false,
  isSnippet = false,
}) {
  const url = getEndpoint({ isSnippet, isSearch })

  const response = await fetch(url, {
    method: 'POST',
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
