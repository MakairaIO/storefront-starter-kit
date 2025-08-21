import { useGlobalData } from '../../utils'
import Metadata from './Metadata'
import { ContentElements, InformationModal } from '../../patterns'

function Landingpage() {
  const { pageData } = useGlobalData()
  const config = pageData.data.config || {}

  if (!config.bottom && !config.top) return null

  return (
    <main>
      <Metadata />

      <ContentElements elements={config.top?.elements} />
      <ContentElements elements={config.bottom?.elements} />
      <InformationModal />
    </main>
  )
}

export default Landingpage
