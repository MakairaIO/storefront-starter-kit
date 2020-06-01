import { Component } from 'react'
import { BrowserHintPage } from '../../patterns'
import { TranslationProvider } from '../../utils'
import allLanguages from '../../config/allLanguages'

export default class BrowserHint extends Component {
  static async getInitialProps(ctx) {
    const { req } = ctx

    const acceptedLanguages = req.headers['accept-language']
      .split(',')
      .map((entry) => entry.replace(/;q=.*/, '')) // remove Quality values (see: https://developer.mozilla.org/en-US/docs/Glossary/quality_values)

    let targetLanguage = 'de' // fallback language
    for (let acceptedLanguage of acceptedLanguages) {
      const isLanguageSupported = allLanguages.find(
        (lang) => lang.value == acceptedLanguage
      )

      if (isLanguageSupported) {
        targetLanguage = acceptedLanguage
        break
      }
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
