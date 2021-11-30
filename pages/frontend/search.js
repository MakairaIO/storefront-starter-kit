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
} from '../../utils'
import ErrorPage from '../_error'

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

  render() {
    if (Object.entries(this.props).length === 0) {
      return <ErrorPage statusCode={500} />
    }

    const { searchResult = {} } = this.props
    const { language } = searchResult

    return (
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
    )
  }
}
