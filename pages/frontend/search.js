import { Component } from 'react'
import qs from 'qs'
import { HeaderWithProps, SearchResultPage } from '../../frontend'
import { BaseLayout } from '../../patterns'
import {
  GlobalDataProvider,
  TranslationProvider,
  fetchSearchResult,
  fetchMenuData,
  logError,
} from '../../utils'
import ErrorPage from '../_error'

export default class Index extends Component {
  static async getInitialProps(ctx) {
    const { query, res } = ctx
    const { seoUrl, ...params } = qs.parse(query)

    try {
      const [searchResult, menuData] = await Promise.all([
        fetchSearchResult({ ctx }),
        fetchMenuData(),
      ])

      return { menuData: menuData.menu, searchResult, params }
    } catch (error) {
      logError(error)

      if (res) {
        res.statusCode = 500

        /**
         * Returning an empty here is intentional, see:
         * https://github.com/zeit/next.js/blob/master/errors/empty-object-getInitialProps.md
         */
        return {}
      }
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
        <TranslationProvider language={language}>
          <BaseLayout>
            <HeaderWithProps />

            <SearchResultPage />
          </BaseLayout>
        </TranslationProvider>
      </GlobalDataProvider>
    )
  }
}
