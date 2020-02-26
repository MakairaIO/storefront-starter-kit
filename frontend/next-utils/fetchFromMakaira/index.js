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
    throw new Error()
  }

  return apiResponse.json()
}
