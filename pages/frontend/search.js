import { Component } from 'react'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import {
  HeaderWithProps,
  FooterWithProps,
  SearchResultPage,
} from '../../frontend'
import { BaseLayout } from '../../patterns'
import {
  GlobalDataProvider,
  ConfigurationProvider,
  TranslationProvider,
  AbTestingProvider,
  fetchSearchResult,
  fetchMenuData,
  redirect,
  redirectToDetailPageOnSingleHit,
  redirectOnSearchRedirectHit,
  GTM,
} from '../../utils'
import ErrorPage from '../_error'
import { ShopProvider } from '@makaira/storefront-react'
import { StorefrontShopAdapterLocal } from '@makaira/storefront-shop-adapter-local'

const shopClient = new StorefrontShopAdapterLocal()

export default class Index extends Component {
  static async getInitialProps(ctx) {
    const { query, res } = ctx
    const { seoUrl, ...params } = qs.parse(query)

    if (isEmpty(query)) redirect({ ctx, target: '/' })

    try {
      const [searchResult, menuData] = await Promise.all([
        fetchSearchResult({ ctx }),
        fetchMenuData(),
      ])

      redirectToDetailPageOnSingleHit({ ctx, searchResult })
      redirectOnSearchRedirectHit({ ctx, searchResult })

      return { menuData, searchResult, params }
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

    if (language) {
      GTM.trackEvent({
        event: 'init',
        country: language,
        language: language,
      })

      this.trackSearchEvent()
    }
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
      <ShopProvider client={shopClient}>
        <GlobalDataProvider {...this.props}>
          <ConfigurationProvider assetUrl={process.env.MAKAIRA_ASSET_URL}>
            <TranslationProvider language={language}>
              <AbTestingProvider>
                <BaseLayout>
                  <HeaderWithProps />

                  <SearchResultPage />

                  <FooterWithProps />
                </BaseLayout>
              </AbTestingProvider>
            </TranslationProvider>
          </ConfigurationProvider>
        </GlobalDataProvider>
      </ShopProvider>
    )
  }
}
