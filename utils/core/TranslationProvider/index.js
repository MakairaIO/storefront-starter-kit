import React, { useContext } from 'react'
import { translations } from '../..'

const TranslationContext = React.createContext()

function TranslationProvider({ language = 'de', children }) {
  const translate = (key, fallback = '') => {
    return translations[language][key] ?? fallback
  }

  return (
    <TranslationContext.Provider value={{ language: language, t: translate }}>
      {children}
    </TranslationContext.Provider>
  )
}

function useTranslation() {
  return useContext(TranslationContext)
}

export default TranslationContext
export { TranslationContext, TranslationProvider, useTranslation }
