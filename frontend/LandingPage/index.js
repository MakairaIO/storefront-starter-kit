import { useGlobalData } from '../../utils'
import Metadata from './Metadata'
import { ContentElements } from '../../patterns'
import ProductList from './ProductListWithProps'

function Landingpage() {
  const { pageData } = useGlobalData()
  const config = pageData.data.config || {}

  if (!config.bottom && !config.top) return null

  return (
    <main>
      <Metadata />

      <ContentElements elements={config.top?.elements} />
      <ProductList />
      <ContentElements elements={config.bottom?.elements} />
    </main>
  )
}

export default Landingpage
