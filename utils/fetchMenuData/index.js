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
  const response = await fetch(
    `${process.env.MAKAIRA_API_URL}/enterprise/menu`,
    {
      method: 'GET',
      headers: {
        'X-Makaira-Instance': process.env.MAKAIRA_API_INSTANCE,
      },
    }
  )

  if (response.status !== 200) {
    const { status, statusText } = response
    const errorBody = await response.json()

    const error = new Error()
    error.code = status
    error.message = statusText
    error.cause = errorBody.message
    error.stack = 'fetchMenuData()'

    throw error
  }

  return response.json()
}
