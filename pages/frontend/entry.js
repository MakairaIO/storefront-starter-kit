import { Component } from 'react'
import qs from 'qs'
import {
  HeaderWithProps,
  FooterWithProps,
  LandingPage,
  ListingPage,
  DetailPage,
  BundlePage,
} from '../../frontend'
import { BaseLayout } from '../../patterns'
import {
  GlobalDataProvider,
  ConfigurationProvider,
  TranslationProvider,
  AbTestingProvider,
  fetchPageData,
  fetchMenuData,
  redirect,
  wait,
} from '../../utils'
import ErrorPage from '../_error'

const pageComponents = {
  page: LandingPage,
  bundle: BundlePage,
  category: ListingPage,
  manufacturer: ListingPage,
  'makaira-productgroup': DetailPage,
}

export default class Index extends Component {
  static async getInitialProps(ctx) {
    const { query, res } = ctx
    const { seoUrl, ...params } = qs.parse(query)

    try {
      const [pageData, menuData] = await Promise.all([
        fetchPageData({ ctx }),
        fetchMenuData(),
      ])

      if (pageData.type == 'redirect') {
        const {
          data: { target, code },
        } = pageData

        redirect({ ctx, target, code })
      }

      return { menuData, pageData, params }
    } catch (error) {
      console.error(error)

      /**
       * Catching an error inside getInitialProps means that - in most cases - the
       * current URL was not found in any ElasticSearch document.
       *
       * In this case, we want to make use of a failover mechanism that sets
       * a 404 status-code in the response and thereby triggers the request to be
       * re-routed to the "real" Shop-System by the load balancer.
       *
       * On the server this is achived by setting the status code and rendering the
       * <ErrorPage /> component.
       *
       * On the client this is achived by refreshing the current page, thereby triggering
       * a server-side rendering which in turn re-routes at the load balancer again.
       *
       * Note: For the client side we have to make use of a small hack. The reason is, that
       * if you just set `window.location.href`, Next.js will not wait for the page transition
       * and instead continue to run through its lifecycle methods, causing the <ErrorPage />
       * to show up before actually reloading the page. To work around this issue, we set a
       * timeout after changing `window.location.href`.
       */
      if (res) {
        res.statusCode = 404

        /**
         * Returning an empty here is intentional, see:
         * https://github.com/zeit/next.js/blob/master/errors/empty-object-getInitialProps.md
         */
        return {}
      } else {
        const normalizedSeoUrl = seoUrl.replace(/^\//, '') // replace leading slash from path
        window.location.href = `/${normalizedSeoUrl}`

        // Do not remove for now! See comment above.
        await wait(30000)
      }
    }
  }

  render() {
    if (Object.entries(this.props).length === 0) {
      return <ErrorPage statusCode={404} />
    }

    const { pageData } = this.props
    const { type, language } = pageData
    const PageComponent = pageComponents[type]

    return (
      <GlobalDataProvider {...this.props}>
        <ConfigurationProvider assetUrl={process.env.MAKAIRA_ASSET_URL}>
          <TranslationProvider language={language}>
            <AbTestingProvider>
              <BaseLayout>
                <HeaderWithProps />

                <PageComponent />

                <FooterWithProps />
              </BaseLayout>
            </AbTestingProvider>
          </TranslationProvider>
        </ConfigurationProvider>
      </GlobalDataProvider>
    )
  }
}
