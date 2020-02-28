import { useState } from 'react'
import { useRouter } from 'next/router'
import componentConfig from '../../library/config'
import { TranslationProvider, useTranslation } from '../../utils'
import allLanguages from '../../config/allLanguages'
import { BaseLayout } from '../../patterns'

export default function Variant() {
  const [currentLanguage, changeLanguage] = useState('de')
  const router = useRouter()
  const dynamicSegment = router.query.id
  const [componentName, variantName] = dynamicSegment.split('_')

  const componentEntry = componentConfig.find(
    entry => entry.name === componentName
  )
  const variantEntry = componentEntry.variants.find(
    entry => entry.name === variantName
  )

  function LanguageSelect() {
    return (
      <select
        value={currentLanguage}
        onChange={event => changeLanguage(event.currentTarget.value)}
        onBlur={event => changeLanguage(event.currentTarget.value)}
        className="pali__language-select pali__language-select--preview"
      >
        {allLanguages.map(language => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    )
  }

  const Component = componentEntry.component
  const props = variantEntry.props

  return (
    <TranslationProvider language={currentLanguage}>
      <BaseLayout>
        <Component {...props} useTranslation={useTranslation} />
      </BaseLayout>

      <LanguageSelect />
    </TranslationProvider>
  )
}