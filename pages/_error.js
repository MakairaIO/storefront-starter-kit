import React, { Component } from 'react'
import { TranslationProvider } from '../utils'
import { ErrorPage } from '../patterns'

// FIXME: How can we provide the TranslationProvider with the last language the user select/used/visited?
class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null

    return {
      statusCode,
      error: {
        message: err.message,
        stack: err.stack.toString(),
      },
    }
  }

  render() {
    return (
      <TranslationProvider>
        <ErrorPage {...this.props} />
      </TranslationProvider>
    )
  }
}

export default Error
