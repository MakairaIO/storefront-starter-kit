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
  const apiResponse = await fetch(
    `${process.env.MAKAIRA_API_URL}/enterprise/menu`,
    {
      method: 'GET',
      headers: {
        'X-Makaira-Instance': process.env.MAKAIRA_API_INSTANCE,
      },
    }
  )

  if (apiResponse.status !== 200) {
    throw new Error()
  }

  return apiResponse.json()
}
