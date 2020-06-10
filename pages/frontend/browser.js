import { Component } from 'react'
import { BrowserHintPage } from '../../patterns'
import { TranslationProvider } from '../../utils'
import allLanguages from '../../config/allLanguages'

export default class BrowserHint extends Component {
  static async getInitialProps(ctx) {
    const { req } = ctx

    let targetLanguage = 'de' // fallback language

    try {
      for (let acceptedLanguage of req.acceptsLanguages()) {
        const isLanguageSupported = allLanguages.find(
          (lang) => lang.value == acceptedLanguage
        )

        if (isLanguageSupported) {
          targetLanguage = acceptedLanguage
          break
        }
      }
    } catch (error) {
      // intentionally left blank since in some edge cases the IE11 seems to be not sending the relevant header
    }

    return {
      language: targetLanguage,
    }
  }

  render() {
    return (
      <TranslationProvider language={this.props.language}>
        <BrowserHintPage />
      </TranslationProvider>
    )
  }
}
