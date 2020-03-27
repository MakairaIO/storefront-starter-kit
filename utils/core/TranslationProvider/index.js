import { Component, useContext } from 'react'
import german from './locales/de'
import english from './locales/en'

const translations = {
  de: {
    ...german,
  },
  en: {
    ...english,
  },
}

const TranslationContext = React.createContext()

class TranslationProvider extends Component {
  static defaultProps = { language: 'de' }

  translate = (key, fallback = '') => {
    return translations[this.props.language][key] ?? fallback
  }

  render() {
    return (
      <TranslationContext.Provider
        value={{ language: this.props.language, t: this.translate }}
      >
        {this.props.children}
      </TranslationContext.Provider>
    )
  }
}

function useTranslation() {
  return useContext(TranslationContext)
}

export default TranslationContext
export { TranslationContext, TranslationProvider, useTranslation }
