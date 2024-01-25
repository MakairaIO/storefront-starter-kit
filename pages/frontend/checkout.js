import { Component } from 'react'
import qs from 'qs'
import { HeaderWithProps, FooterWithProps } from '../../frontend'
import { BaseLayout, Text } from '../../patterns'
import {
  GlobalDataProvider,
  ConfigurationProvider,
  TranslationProvider,
  AbTestingProvider,
  fetchMenuData,
  GTM,
  redirect,
} from '../../utils'
import ErrorPage from '../_error'
import { ShopProvider } from '@makaira/storefront-react'
import { StorefrontShopAdapterLocal } from '@makaira/storefront-shop-adapter-local'

const shopClient = new StorefrontShopAdapterLocal()

export default class Index extends Component {
  static async getInitialProps(ctx) {
    const { query, res } = ctx
    console.log(query)
    if (!query.checkoutId && !query.complete) {
      redirect({ ctx, target: '/' })
    }

    const { seoUrl, ...params } = qs.parse(query)

    try {
      const [menuData] = await Promise.all([fetchMenuData()])

      return {
        menuData,
        params,
        checkoutId: query.checkoutId,
        complete: query.complete,
      }
    } catch (error) {
      console.error(error)

      if (res) {
        res.statusCode = 500
      }

      /**
       * Returning an empty here is intentional, see:
       * https://github.com/zeit/next.js/blob/master/errors/empty-object-getInitialProps.md
       */
      return {}
    }
  }

  componentDidMount() {
    const language = this.props.searchResult?.language
    const checkoutId = this.props.checkoutId

    if (language) {
      GTM.trackEvent({
        event: 'init',
        country: language,
        language: language,
      })

      this.trackSearchEvent()
    }

    window.addEventListener('DOMContentLoaded', () => {
      if (this.props.complete) return
      const checkoutOptions = {
        checkoutKey: process.env.NEXI_PUBLIC_KEY,
        paymentId: checkoutId,
        containerId: 'checkout-container',
      }

      // this is the global object that is provided by the nexi sdk
      // eslint-disable-next-line no-undef
      const checkout = new Dibs.Checkout(checkoutOptions)
      checkout.on('payment-completed', () => {
        window.location = '/checkout?complete=true'
      })
    })
  }

  componentDidUpdate(prevProps) {
    // Check for Error Page
    if (Object.entries(this.props).length === 0) return

    // We only want to track a page view if the search phrase was actually changed
    const shouldTrackSearch =
      prevProps.params?.searchPhrase !== this.props.params?.searchPhrase

    if (shouldTrackSearch) {
      this.trackSearchEvent()
    }
  }

  trackSearchEvent = () => {
    const search_term = this.props.params?.searchPhrase ?? ''
    const search_result_count = this.props.searchResult?.product?.count ?? 0

    GTM.trackEvent({
      event: 'search',
      search_term,
      search_result_count,
    })
  }

  render() {
    if (Object.entries(this.props).length === 0) {
      return <ErrorPage statusCode={500} />
    }

    const { searchResult = {} } = this.props
    const { language } = searchResult

    return (
      <>
        <ShopProvider client={shopClient}>
          <GlobalDataProvider {...this.props}>
            <ConfigurationProvider assetUrl={process.env.MAKAIRA_ASSET_URL}>
              <TranslationProvider language={language}>
                <AbTestingProvider>
                  <BaseLayout>
                    <HeaderWithProps />
                    {this.props.complete ? (
                      <Text>Checkout complete!</Text>
                    ) : (
                      <div id="checkout-container"></div>
                    )}
                    <FooterWithProps />
                  </BaseLayout>
                </AbTestingProvider>
              </TranslationProvider>
            </ConfigurationProvider>
          </GlobalDataProvider>
        </ShopProvider>
        <script src="https://test.checkout.dibspayment.eu/v1/checkout.js?v=1"></script>
      </>
    )
  }
}
