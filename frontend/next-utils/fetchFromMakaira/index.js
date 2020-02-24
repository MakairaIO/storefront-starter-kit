import fetch from 'isomorphic-unfetch'

export default async function fetchFromMakaira(body) {
  const apiResponse = await fetch(
    `${process.env.MAKAIRA_API_URL}/enterprise/page`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Makaira-Instance': process.env.MAKAIRA_API_INSTANCE,
      },
      body: JSON.stringify(body),
    }
  )

  if (apiResponse.status !== 200) {
    const { status, statusText } = apiResponse
    const errorBody = await apiResponse.json()

    const error = new Error()
    error.code = status
    error.message = statusText
    error.cause = errorBody.message || 'No Page found for URL'
    error.stack = 'fetchFromMakaira.js'

    throw error
  }

  return apiResponse.json()
}
