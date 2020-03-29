import Router from 'next/router'
import qs from 'qs'
import allLanguages from '../../../config/allLanguages'

export default async function submitSearchForm({ searchPhrase, language }) {
  const languageObject = allLanguages.find((lang) => lang.value == language)

  const seoUrl = languageObject['searchRoute']
  const queryString = qs.stringify({ searchPhrase })

  await Router.push(
    `/frontend/search?seoUrl=${seoUrl}&${queryString}`,
    `${seoUrl}?${queryString}`
  )
}
