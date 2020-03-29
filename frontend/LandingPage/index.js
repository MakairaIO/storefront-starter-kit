import { useGlobalData } from '../../utils'
import Metadata from './Metadata'
import { ContentElements } from '../../patterns'

function Landingpage() {
  const { pageData } = useGlobalData()
  const config = pageData.data.config

  if (!config?.main) return null

  return (
    <main>
      <Metadata />

      <ContentElements elements={config.main.elements} />
    </main>
  )
}

export default Landingpage
