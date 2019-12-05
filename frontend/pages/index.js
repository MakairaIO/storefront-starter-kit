import { Component } from 'react'
import { LandingPage, ListingPage, DetailPage } from '../next-components'
import { TranslationProvider } from '../public/static/utils'
import qs from 'qs'
import { GlobalDataProvider, fetchPageData, fetchMenuData } from '../next-utils'
import ErrorPage from './_error'

export default class IndexPageWrapper extends Component {
  static async getInitialProps(ctx) {
    const { query, res } = ctx
    const { seoUrl, ...params } = qs.parse(query)

    let pageProps = {}
    try {
      const [pageData, menuData] = await Promise.all([
        fetchPageData({ ctx }),
        fetchMenuData({ ctx }),
      ])

      pageProps = {
        ...pageProps,
        menuData,
        pageData: { ...pageData, params },
      }
    } catch (err) {
      console.error(`Error for URL: '${seoUrl}' \n`, err)
      pageProps = {}

      if (res) {
        // server-side error-handling => set 404-status in server-response for hand off to LB
        res.statusCode = 404
      } else {
        const normalizedSeoUrl = seoUrl.replace(/^\//, '') // replace leading slash from path
        window.location.href = `/${normalizedSeoUrl}`

        // stop next/react from continuing to render after initiating the redirect above
        function Sleep(milliseconds) {
          return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        await Sleep(30000)
      }
    } finally {
      return { pageProps }
    }
  }

  render() {
    const { pageProps } = this.props

    if (Object.entries(pageProps).length === 0) {
      return <ErrorPage statusCode={404} />
    }

    return <IndexPage {...this.props} />
  }
}

const pageComponents = {
  page: LandingPage,
  category: ListingPage,
  manufacturer: ListingPage,
  product: DetailPage,
}

function IndexPage(props) {
  const { pageProps } = props
  const { pageData } = pageProps

  const { type, language, ...page } = pageData
  const PageComponent = pageComponents[type]

  return (
    <GlobalDataProvider {...pageProps}>
      <TranslationProvider language={language}>
        <PageComponent key={`${page.data.id}-${language}`} />
      </TranslationProvider>
    </GlobalDataProvider>
  )
}
