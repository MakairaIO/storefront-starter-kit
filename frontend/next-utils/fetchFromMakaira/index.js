import fetch from 'isomorphic-unfetch'

export default async function fetchFromMakaira(body) {
  let url = process.env.MAKAIRA_API_URL

  if (body.isSearch) {
    url += '/search/public'
  } else {
    url += '/enterprise/page'
  }

  const apiResponse = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Makaira-Instance': process.env.MAKAIRA_API_INSTANCE,
    },
    body: JSON.stringify(body),
  })

  if (apiResponse.status !== 200) {
    throw new Error()
  }

  return apiResponse.json()
}
