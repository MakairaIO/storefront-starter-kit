import { GetServerSidePropsContext, NextPage } from 'next'
import {
  HeaderWithProps,
  FooterWithProps,
  LandingPage,
  ListingPage,
  DetailPage,
  BundlePage,
} from '../../frontend'
import { StorefrontShopAdapterLocal } from '@makaira/storefront-shop-adapter-local'
// import { GlobalData, useGlobalData } from '../../utils/core/globalDataStore'
import { ShopProvider } from '@makaira/storefront-react'
import { fetchMultiple } from '@makaira/storefront-core'
import {
  AbTestingProvider,
  ConfigurationProvider,
  GlobalDataProvider,
  TranslationProvider,
  makairaClient,
  redirect,
} from '../../utils'
import qs from 'qs'
import { BaseLayout } from '../../patterns'
import { GlobalData } from '../../utils/core/globalDataStore'

const pageComponents: {
  [key: string]: React.ComponentType<unknown>
} = {
  page: LandingPage,
  bundle: BundlePage,
  category: ListingPage,
  manufacturer: ListingPage,
  'makaira-productgroup': DetailPage,
}

export type EntryProps = Pick<
  GlobalData,
  'menuData' | 'pageData' | 'searchResult' | 'params'
>

const shopClient = new StorefrontShopAdapterLocal()

const Entry: NextPage<EntryProps> = (props) => {
  const { pageData } = props

  const PageComponent = pageComponents[pageData.type]!

  if (Object.keys(pageData).length === 0) return null

  return (
    <ShopProvider client={shopClient}>
      <GlobalDataProvider data={props}>
        <ConfigurationProvider assetUrl={process.env.MAKAIRA_ASSET_URL}>
          <TranslationProvider language={pageData.language}>
            <AbTestingProvider>
              <BaseLayout>
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [pageData, menuData] = await fetchMultiple(
    makairaClient.request('page', ctx),
    makairaClient.request('menu')
  )

  if (pageData.type === 'redirect') {
    const {
      data: { target, code },
    } = pageData
    redirect({ ctx, target, code })
  }

  // TODO: handle 404 and 500 errors

  return {
    props: {
      pageData,
      menuData,
      searchResult: {},
      params: qs.parse(ctx.query as unknown as string),
    },
  }
}

export default Entry
