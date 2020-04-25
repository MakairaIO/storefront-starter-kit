import { Header } from '../../patterns'
import { useGlobalData, useTranslation, submitSearchForm } from '../../utils'

export default function HeaderWithProps() {
  const { menuData } = useGlobalData()
  const { language } = useTranslation()

  const headerProps = {
    menu: menuData,
    submitSearchForm: (searchPhrase) =>
      submitSearchForm({ searchPhrase, language }),
  }

  return <Header {...headerProps} />
}
