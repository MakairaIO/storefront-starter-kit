import App from 'next/app'
import Router from 'next/router'
import { SVGSprite } from '../patterns'
import '../patterns/index.styl'

class MyApp extends App {
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
  }

  // Workaround for: https://github.com/zeit/next.js/issues/3065#issuecomment-513429744
  componentDidMount() {
    Router.beforePopState(({ as }) => {
      window.location.href = as
      window.location.reload()

      return false
    })
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
