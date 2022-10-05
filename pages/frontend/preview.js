import { Component } from 'react'
import {
  FooterWithProps,
  LandingPage,
  ListingPage,
  DetailPage,
  BundlePage,
  HeaderWithProps,
} from '../../frontend'
import { BaseLayout } from '../../patterns'
import {
  GlobalDataProvider,
  ConfigurationProvider,
  TranslationProvider,
  AbTestingProvider,
  fetchMenuData,
} from '../../utils'
import Head from 'next/head'
import { ShopProvider } from '@makaira/storefront-react'
import { StorefrontShopAdapterLocal } from '@makaira/storefront-shop-adapter-local'

const pageComponents = {
  page: LandingPage,
  bundle: BundlePage,
  category: ListingPage,
  manufacturer: ListingPage,
  'makaira-productgroup': DetailPage,
}

const MAKAIRA_PAGE_EDITOR_VERSION = '1.0'

function NoIndexMeta() {
  return (
    <Head>
      <title>Makaira Content Editor - Preview</title>
      <meta name="robots" content="noindex" />
    </Head>
  )
}

const shopClient = new StorefrontShopAdapterLocal()

/**
 * Preview-Page that is only used for the makaira backend content editor preview.
 * Won't request makaira API before page load and instead listen for preview
 * data via the postMessage-API from the makaira backend.
 */
export default class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageData: {
        type: 'loading',
      },
      isPreview: true,
    }
  }

  static async getInitialProps() {
    try {
      const menuData = await fetchMenuData()
      return { menuData }
    } catch (error) {
      console.error(error)
      return {}
    }
  }

  componentDidMount() {
    window.addEventListener('message', this.updateStateForPreview)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.updateStateForPreview)
  }

  /**
   * Communication with the makaira backend via the postMessage-API.
   * This function handles the message event and will answer
   * the requests or update the pageData.
   *
   * Checks also if the sender is allowed to communicate with the storefront.
   *
   * @param event
   */
  updateStateForPreview = (event) => {
    const { source, payload, action } = event.data

    // Check if we get the data from makaira backend or from localhost
    if (event.origin !== process.env.MAKAIRA_API_URL) return

    // Check if it is also send by the makaira backend
    if (source !== 'makaira-bridge') return

    // The makaira backend wants to know which version of the page editor preview
    // this storefront supports. We answer here with the set current version.
    if (action === 'reportVersion') {
      event.source.postMessage(
        {
          source: 'makaira-bridge',
          action: 'responseVersion',
          version: MAKAIRA_PAGE_EDITOR_VERSION,
        },
        event.origin
      )
      // Update the GlobalDataProvider when we receive new page data from the makaira backend.
    } else if (action === 'update') {
      this.setState({ pageData: payload.data, isPreview: true })
    }
  }

  render() {
    const { pageData } = this.state
    const { type, language } = pageData

    if (type === 'loading') {
      return <NoIndexMeta />
    }

    const PageComponent = pageComponents[type]

    // We expect in the structure of the store, that params is already an object,
    // so we need to provide it here to the GlobalDataProvider.
    return (
      <ShopProvider client={shopClient}>
        <GlobalDataProvider
          {...this.state}
          params={{}}
          menuData={this.props.menuData}
        >
          <ConfigurationProvider assetUrl={process.env.MAKAIRA_ASSET_URL}>
            <TranslationProvider language={language}>
              <AbTestingProvider>
                <BaseLayout>
                  <NoIndexMeta />
                  <HeaderWithProps />

                  <PageComponent />

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
