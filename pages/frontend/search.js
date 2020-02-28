import { Component } from 'react'
import { BaseLayout, Header } from '../../patterns'
import {
  GlobalDataProvider,
  TranslationProvider,
  fetchSearchResult,
  fetchMenuData,
} from '../../utils'
import ErrorPage from '../_error'

export default class Index extends Component {
  static async getInitialProps(ctx) {
    try {
      const [searchResult, menuData] = await Promise.all([
        fetchSearchResult({ ctx }),
        fetchMenuData(),
      ])

      return { menuData, searchResult }
    } catch (error) {
      console.error(error)

      const { res } = ctx
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
    return <h1>search</h1>
    if (Object.entries(this.props).length === 0) {
      return <ErrorPage statusCode={500} />
    }

    const { pageData } = this.props
    const { language } = pageData

    return (
      <GlobalDataProvider {...this.props}>
        <TranslationProvider language={language}>
          <BaseLayout>
            <Header />
          </BaseLayout>
        </TranslationProvider>
      </GlobalDataProvider>
    )
  }
}
