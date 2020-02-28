import { Component } from 'react'
import { LandingPage, ListingPage, DetailPage } from '../next-components'
import { Header } from '../public/components'
import { TranslationProvider } from '../public/utils'
import {
  GlobalDataProvider,
  fetchSearchResult,
  fetchMenuData,
} from '../next-utils'
import ErrorPage from './_error'

const pageComponents = {
  page: LandingPage,
  category: ListingPage,
  manufacturer: ListingPage,
  product: DetailPage,
}

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
    const { type, language, ...page } = pageData
    const PageComponent = pageComponents[type]

    return (
      <GlobalDataProvider {...this.props}>
        <TranslationProvider language={language}>
          <Header />

          <PageComponent key={`${page.data.id}-${language}`} />
        </TranslationProvider>
      </GlobalDataProvider>
    )
  }
}
