import { useGlobalData } from '../../../utils'
import Metadata from '../Metadata'
import { Breadcrumb, ContentElements } from '../../../patterns'
import ProductList from './ProductListWithProps'

function Landingpage() {
  const { pageData } = useGlobalData()
  const config = pageData.data.config || {}

  const {
    title = '',
    seoTitle,
    robotIndex = 'index',
    robotFollow = 'follow',
    ...additionalMetadata
  } = pageData.data.metadata

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
