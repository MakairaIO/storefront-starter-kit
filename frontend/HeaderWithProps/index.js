import { Header } from '../../patterns'
import { useGlobalData, submitSearchForm } from '../../utils'

export default function HeaderWithProps() {
  const { menuData, pageData, searchResult } = useGlobalData()

  const language = pageData?.language ?? searchResult.language

  const headerProps = {
    menu: menuData,
    submitSearchForm: (searchPhrase) =>
      submitSearchForm({ searchPhrase, language }),
  }

  return <Header {...headerProps} />
}
