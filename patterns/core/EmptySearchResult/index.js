import { Icon, Heading } from '../..'
import { useTranslation } from '../../../utils'

function EmptySearchResult() {
  const { t } = useTranslation()

  return (
    <div className="empty-search-result">
      <Icon symbol="search" />

      <Heading element="h3">{t('SEARCH_NO_RESULT')}</Heading>
    </div>
  )
}

export default EmptySearchResult
export { default as emptySearchResultVariants } from './variants.js'
