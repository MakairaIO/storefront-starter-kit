import { useState } from 'react'
import { useRouter } from 'next/router'
import componentConfig from '../../library/config'
import { ConfigurationProvider, TranslationProvider } from '../../utils'
import allLanguages from '../../config/allLanguages'
import { BaseLayout } from '../../patterns'

export default function Variant() {
  const [currentLanguage, changeLanguage] = useState('de')
  const [barsVisible, toggleBars] = useState(false)
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

  function BarToggle() {
    return (
      <>
        <select
          value={barsVisible}
          onChange={() => toggleBars(!barsVisible)}
          onBlur={() => toggleBars(!barsVisible)}
          className="pali__bars-select"
        >
          <option value={false}>Bars off</option>
          <option value={true}>Bars on</option>
        </select>

        {barsVisible && <div className="pali__bars"></div>}
      </>
    )
  }

  const Component = componentEntry.component
  const props = variantEntry.props

  return (
    <ConfigurationProvider>
      <TranslationProvider language={currentLanguage}>
        <BaseLayout>
          <Component {...props} />
        </BaseLayout>

        <LanguageSelect />

        <BarToggle />
      </TranslationProvider>
    </ConfigurationProvider>
  )
}
