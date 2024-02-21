import { Header } from '../../../patterns'
import {
  useGlobalData,
  useTranslation,
  submitSearchForm,
  makairaClient,
} from '../../../utils'

export default function HeaderWithProps() {
  const { menuData } = useGlobalData()
  const { language } = useTranslation()

  const headerProps = {
    menu: menuData,
    fetchAutosuggestResult: (searchPhrase) =>
      makairaClient
        .request('search')
        .setSearchPhrase(searchPhrase)
        .setCount(8)
        .fetch(),
    submitSearchForm: (searchPhrase) =>
      submitSearchForm({ searchPhrase, language }),
  }

  return <Header {...headerProps} />
}
