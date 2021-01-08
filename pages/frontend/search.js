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
  fetchSearchResult,
  fetchMenuData,
  redirect,
  getNumberOfActiveFilters,
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

      const { product = {} } = searchResult
      const { aggregations = {} } = product

      const hasActiveAggregations =
        getNumberOfActiveFilters({ aggregations }) > 0

      if (product.count == 1 && !hasActiveAggregations) {
        const item = product.items[0]
        const { url } = item.fields

        redirect({ ctx, target: url, code: 302 })
      }

      return { menuData, searchResult, params }
    } catch (error) {
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
            <BaseLayout>
              <HeaderWithProps />

              <SearchResultPage />

              <FooterWithProps />
            </BaseLayout>
          </TranslationProvider>
        </ConfigurationProvider>
      </GlobalDataProvider>
    )
  }
}
