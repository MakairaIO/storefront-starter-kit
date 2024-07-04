export default async function fetchMenuData() {
  let data = null

  try {
    if (process.browser && localStorage.getItem('menuData')) {
      const menuString = localStorage.getItem('menuData')

      if (['undefined', 'null', '[]'].includes(menuString)) {
        const response = await fetchMenuFromApi()

        data = response.menu
      } else {
        data = JSON.parse(menuString)
      }
    }
  } catch (error) {
    // iPhone private mode is able to prevent web access localStorage, this will lead to throw error when calling object localStorage
    console.warn('You are preventing us to access localStorage!')
  }

  if (!data) {
    const response = await fetchMenuFromApi()

    data = response.menu
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

    console.error(error)

    return {
      menu: [],
    }
  }

  return response.json()
}
