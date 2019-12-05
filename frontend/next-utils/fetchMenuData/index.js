export default async function fetchMenuData() {
  let data

  if (process.browser && localStorage.getItem('menuData')) {
    const menuString = localStorage.getItem('menuData')

    data = JSON.parse(menuString)
  } else {
    data = await fetchMenuFromApi()
  }

  return data
}

async function fetchMenuFromApi() {
  const apiMenuResponse = await fetch(
    `${process.env.API_URL}/enterprise/menu`,
    {
      method: 'GET',
      headers: {
        'X-Makaira-Instance': process.env.API_INSTANCE,
      },
    }
  )

  if (apiMenuResponse.status !== 200) {
    const { status, statusText } = apiMenuResponse
    const errorBody = await apiMenuResponse.json()

    const error = new Error()
    error.code = status
    error.message = statusText
    error.cause = errorBody.message
    error.stack = 'fetchMenuData.js'

    throw error
  }

  return apiMenuResponse.json()
}
