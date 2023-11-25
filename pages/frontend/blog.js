import { Component } from 'react'
import {
  HeaderWithProps,
  FooterWithProps,
  BlogListingPage,
} from '../../frontend'
import { BaseLayout } from '../../patterns'
import {
  GlobalDataProvider,
  ConfigurationProvider,
  TranslationProvider,
  AbTestingProvider,
  fetchMenuData,
  fetchDocumentData,
} from '../../utils'
import allLanguages from '../../config/allLanguages'
import { ShopProvider } from '@makaira/storefront-react'
import { StorefrontShopAdapterLocal } from '@makaira/storefront-shop-adapter-local'

const shopClient = new StorefrontShopAdapterLocal()

export default class Index extends Component {
  static async getInitialProps(ctx) {
    const { res } = ctx

    const path = ctx.asPath
      .replace(/\?.*/, '') // remove query string
      .replace(/\/$/, '') // replace trailing slash to match definition in allLanguages

    console.log(path)

    const languageObject = allLanguages.find((lang) => lang.blogRoute == path)
    const language = languageObject?.value || 'de'

    try {
      const [blogData, menuData] = await Promise.all([
        fetchDocumentData({
          language,
          datatype: 'post',
          ctx,
        }),
        fetchMenuData(),
      ])

      return { menuData, blogData }
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
    // if (Object.entries(this.props).length === 0) {
    //   return <ErrorPage statusCode={500} />
    // }

    const { blogData = [] } = this.props

    return (
      <ShopProvider client={shopClient}>
        <GlobalDataProvider {...this.props}>
          <ConfigurationProvider assetUrl={process.env.MAKAIRA_ASSET_URL}>
            <TranslationProvider language={'de'}>
              <AbTestingProvider>
                <BaseLayout>
                  <HeaderWithProps />

                  <BlogListingPage blogData={blogData} />

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
