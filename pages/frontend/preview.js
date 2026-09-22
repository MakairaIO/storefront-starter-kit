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
  resolvePageContentSnippets,
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

const isAllowedPreviewOrigin = (origin) => {
  if (origin === process.env.NEXT_PUBLIC_MAKAIRA_API_URL) return true

  try {
    const { hostname } = new URL(origin)
    return hostname === 'localhost' || hostname === '127.0.0.1'
  } catch {
    return false
  }
}

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
 * Won't request the makaira page API before load. Page data arrives via
 * postMessage from the makaira backend; content-snippet placeholders are then
 * resolved via /enterprise/snippets.
 */
export default class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageData: {
        type: 'loading',
      },
      isPreview: true,
      selectedElement: '',
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
  updateStateForPreview = async (event) => {
    const { source, payload, action } = event.data

    // Accept the Makaira backend and local admin UI (localhost preview iframe).
    if (!isAllowedPreviewOrigin(event.origin)) return

    // // Check if it is also send by the makaira backend
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
      return
      // Update the GlobalDataProvider when we receive new page data from the makaira backend.
    }
    if (action === 'update') {
      const pageData = payload.data
      const { language } = pageData

      try {
        await resolvePageContentSnippets(pageData, { language })
      } catch (error) {
        console.error(error)
      }

      this.setState({ pageData, isPreview: true })
      return
    }

    if (action === 'selected-element') {
      this.setState({ selectedElement: payload })
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
          <ConfigurationProvider
            assetUrl={process.env.NEXT_PUBLIC_MAKAIRA_ASSET_URL}
          >
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
