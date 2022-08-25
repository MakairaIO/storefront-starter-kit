import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { SVGSprite } from '../patterns'
import { GTM } from '../utils'

// The next line is excluded from linting since the file gets generated at runtime.
/* eslint-disable-next-line import/no-unresolved */
import '../public/assets/styles/main.css'

class MyApp extends App {
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
  }

  componentDidMount() {
    GTM.init()

    this.initScrollRestorationListeners()
  }

  /**
   * Next.js - just like many other SPA-Frameworks - does not
   * offer an out-of-the-box solution when it comes to scroll restoration,
   * e.g. on pressing the "browser back" button.
   * Next.js as well as other libraries have stated that they also consider
   * this issue as a "won't fix", leaving solutions up to individual projects.
   * Below is our approach to restoring the scroll positions.
   * You can find more information about this topic here:
   * - https://github.com/vercel/next.js/issues/3303
   * - https://reactrouter.com/web/guides/scroll-restoration
   * - https://www.ccdatalab.org/blog/automatic-scroll-restoration-single-page-applications
   */
  initScrollRestorationListeners = () => {
    const cachedPageHeight = []
    const html = document.querySelector('html')

    Router.events.on('routeChangeStart', () => {
      cachedPageHeight.push(document.documentElement.offsetHeight)
    })

    Router.events.on('routeChangeComplete', () => {
      setTimeout(() => {
        html.style.height = 'initial'
      }, 500)
    })

    Router.beforePopState(() => {
      html.style.height = `${cachedPageHeight.pop()}px`

      return true
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>

        <SVGSprite />

        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
