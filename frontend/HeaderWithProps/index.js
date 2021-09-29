import { Header } from '../../patterns'
import {
  useGlobalData,
  useTranslation,
  submitSearchForm,
  fetchAutosuggestResult,
} from '../../utils'

export default function HeaderWithProps() {
  const { menuData, cart } = useGlobalData()
  const { language } = useTranslation()

  const headerProps = {
    cart,
    menu: menuData,
    fetchAutosuggestResult: (searchPhrase) =>
      fetchAutosuggestResult({ searchPhrase, language }),
    submitSearchForm: (searchPhrase) =>
      submitSearchForm({ searchPhrase, language }),
  }

  return <Header {...headerProps} />
}
