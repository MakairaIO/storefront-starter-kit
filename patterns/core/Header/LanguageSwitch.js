import { useRouter } from 'next/router'
import { useGlobalData } from '../../../utils'
import Dropdown from '../Dropdown'

const LanguageSwitch = () => {
  const { push } = useRouter()
  const { pageData } = useGlobalData()

  const allLanguages = Object.keys(pageData?.data?.self?.selfLinks ?? {}).map(
    (language) => ({
      value: language,
      label: language,
    })
  )

  const currentLanguage = pageData?.language

  function onSwitchLanguage({ value: newLanguage }) {
    if (currentLanguage !== newLanguage) {
      const href = pageData?.data?.self?.selfLinks?.[newLanguage]

      push(
        `${href.startsWith('/') ? '' : '/'}${
          pageData?.data?.self?.selfLinks?.[newLanguage]
        }`
      )
    }
  }

  if (allLanguages.length > 1) {
    return (
      <Dropdown
        id="languageSwitch"
        options={allLanguages}
        value={currentLanguage}
        onChange={onSwitchLanguage}
        className="language-switch"
      />
    )
  }

  return null
}

export default LanguageSwitch
