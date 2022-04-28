import React, { Component } from 'react'
import { logError } from '../../../utils'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    if (error) {
      return { hasError: true }
    }
  }

  componentDidCatch(error) {
    const { origin, pathname, search } = window.location
    const { platform, userAgent } = window.navigator

    let data = {
      Host: origin,
      Path: pathname,
      queryString: search,
      Platform: platform,
      'User-Agent': userAgent,
    }

    if (error != null) {
      const { message, stack } = error

      data['Location'] = 'ErrorBoundary'
      data['Error'] = message
      data['Stacktracke'] = stack
    }

    logError(data)
  }

  render() {
    const isProdMode = process.env.NODE_ENV == 'production'

    if (this.state.hasError && isProdMode) {
      return null
    }

    if (this.state.hasError && !isProdMode) {
      return (
        <p style={{ textAlign: 'center' }}>
          Component failed to render. Please check error logs.
        </p>
      )
    }

    return this.props.children
  }
}
