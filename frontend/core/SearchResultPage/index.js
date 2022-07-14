import { useGlobalData, useTranslation } from '../../../utils'
import Metadata from '../Metadata'
import ProductList from './ProductListWithProps'

function SearchResultPage() {
  const { params = {} } = useGlobalData()

  // restParams = sorting, pagination, ...
  const { searchPhrase } = params
  const { t } = useTranslation()

  return (
    <main>
      <Metadata
        title={t('SEARCH_RESULT_META_TITLE')(searchPhrase)}
        robotIndex="noindex"
        robotFollow="nofollow"
      />
      <ProductList />
    </main>
  )
}

export default SearchResultPage
