import App from 'next/app'
import { SVGSprite } from '../patterns'

// The next line is excluded from linting since the file gets generated at runtime.
/* eslint-disable-next-line import/no-unresolved */
import '../public/assets/styles/main.css'

class MyApp extends App {
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <SVGSprite />

        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
