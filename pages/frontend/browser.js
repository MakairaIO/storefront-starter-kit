import { Component } from 'react'
import { BrowserHintPage } from '../../patterns'
import { TranslationProvider } from '../../utils'

export default class BrowserHint extends Component {
  static async getInitialProps(ctx) {
    const { req } = ctx
    const acceptLanguage = req.headers['accept-language']

    return {
      language: acceptLanguage.includes('de') ? 'de' : 'en',
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
