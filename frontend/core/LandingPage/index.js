import { useGlobalData } from '../../../utils'
import Metadata from '../Metadata'
import { Breadcrumb, ContentElements } from '../../../patterns'
import ProductList from './ProductListWithProps'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import matomo from '../../../utils/core/tracking/matomo'

function Landingpage() {
  const { pageData } = useGlobalData()
  const config = pageData.data.config || {}

  const metadata = pageData?.data?.metadata || {}

  const {
    title = '',
    seoTitle,
    robotIndex = 'index',
    robotFollow = 'follow',
    ...additionalMetadata
  } = metadata

  const router = useRouter()

  useEffect(() => {
    matomo.init()

    // Track page view on mount and every route change
    const handleRouteChange = (url) => {
      if (window._paq) {
        window._paq.push(['setCustomUrl', url])
        window._paq.push(['setDocumentTitle', document.title])
        window._paq.push(['trackPageView'])
      }
    }

    // Initial page view
    handleRouteChange(window.location.pathname + window.location.search)

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange)

    matomo.trackScrollDepth({
      points: [25, 50, 75, 100],
      debug: false
    })
    const cleanup = matomo.trackTimeOnPage({
      intervals: [10, 30, 60, 120],
      debug: false
    })

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      cleanup && cleanup()
    }
  }, [router.events])

  if (!config.bottom && !config.top) return null

  return (
    <main>
      <Metadata
        title={seoTitle ?? title}
        robotFollow={robotFollow}
        robotIndex={robotIndex}
        additionalMetadata={additionalMetadata}
      />

      <Breadcrumb breadcrumb={pageData.data.self.navigation?.breadcrumb} />
      <ContentElements elements={config.top?.elements} />
      <ProductList />
      <ContentElements elements={config.bottom?.elements} />
    </main>
  )
}

export default Landingpage
