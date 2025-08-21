import { useGlobalData, dispatchShowInformationEvent } from '../../utils'
import classnames from 'classnames'
import { Link } from '..'
import { useEffect } from 'react'
import { translations } from '../../utils/TranslationProvider'

function SwitchLanguage({ darkTheme }) {
  const pageData = useGlobalData()?.pageData || {}
  let { language = '' } = pageData
  const selfLinks = pageData?.data?.self?.selfLinks || {}
  const selfLinksValues = Object.values(selfLinks)
  const isMultiLanguage =
    selfLinksValues.length > 1 && selfLinksValues.every((url) => url !== '')

  useEffect(() => {
    if (!isMultiLanguage) {
      return
    }

    let browserLanguage =
      window.navigator.language || window.navigator.userLanguage || ''

    // browser language code sometimes format like: en-us, de-at
    browserLanguage = browserLanguage.split('-')[0]

    // if browserLanguage not available then set default to 'en'
    if (!selfLinks[browserLanguage]) {
      browserLanguage = 'en'
    }

    const canUseBrowserLanguage = browserLanguage !== language

    if (canUseBrowserLanguage) {
      let languageText =
        translations[browserLanguage][browserLanguage] ||
        browserLanguage.toUpperCase()

      // show english message for default
      let message = translations.en.ASK_FOR_SWITCH
      let buttonText = translations.en.SWITCH_TO

      if (browserLanguage === 'de') {
        message = translations.de.ASK_FOR_SWITCH
        buttonText = translations.de.SWITCH_TO
      }

      window.setTimeout(() => {
        dispatchShowInformationEvent({
          message: message(`<strong>${languageText}</strong>`),
          link: selfLinks[browserLanguage],
          button: buttonText(languageText),
          callBack: null,
        })
      }, 100)
    }
    //eslint-disable-next-line
  }, [])

  const rootClasses = classnames(
    `switch-language switch-language--${language}`,
    {
      'switch-language--dark': darkTheme,
    }
  )

  const languageLink = language === 'de' ? selfLinks['en'] : selfLinks['de']

  if (!isMultiLanguage) {
    return null
  }

  return (
    <Link href={languageLink} className={rootClasses}>
      <div className="switch-language__item">DE</div>
      <div className="switch-language__item">EN</div>
    </Link>
  )
}

export default SwitchLanguage
export { default as switchLanguageVariants } from './variants.js'
