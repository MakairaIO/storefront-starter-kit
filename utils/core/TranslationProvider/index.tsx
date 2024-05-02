import { createContext, useContext, ReactNode } from 'react'
import { translations } from '../..'

type TranslationContextType = {
  language: string
  t: (key: string, fallback?: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
)

interface TranslationProviderProps {
  language?: string
  children: ReactNode
}

function TranslationProvider({
  language = 'de',
  children,
}: TranslationProviderProps) {
  const translate = (key: string, fallback: string = ''): string => {
    return translations[language][key] ?? fallback
  }

  const value: TranslationContextType = { language, t: translate }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

export { TranslationContext, TranslationProvider, useTranslation }
export default TranslationContext
