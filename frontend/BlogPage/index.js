import { useGlobalData } from '../../utils'
import Metadata from './Metadata'
import { ContentElements, InformationModal } from '../../patterns'

function Landingpage() {
  const { pageData } = useGlobalData()

  return (
    <main>
      <Metadata />

      <ContentElements
        elements={pageData.data.self.contentElements?.top?.elements}
      />
      <ContentElements
        elements={pageData.data.self.contentElements?.bottom?.elements}
      />
      <InformationModal />
    </main>
  )
}

export default Landingpage
