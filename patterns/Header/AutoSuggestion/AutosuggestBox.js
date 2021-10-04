import ProductList from './ProductList'
import Links from './Links'
import { Button, Icon } from '../../'
import { useTranslation } from '../../../utils'

function AutosuggestBox(props) {
  const {
    searchResult = {},
    totalResultCount = 0,
    closeSearchPopup,
    goToSearchPage,
  } = props
  const { t } = useTranslation()

  const { product, ...otherResults } = searchResult

  return (
    <div className="autosuggest-box">
      <div className="autosuggest-box__wrapper">
        <Button
          variant="icon-only"
          icon="times"
          className="autosuggest-box__close"
          onClick={closeSearchPopup}
        />

        <Links
          {...otherResults}
          isVisible={product.total != totalResultCount}
        />

        {product.count > 0 && (
          <section className="autosuggest-box__products">
            <ProductList products={product.items} count={product.count} />
          </section>
        )}
      </div>
      <div className="autosuggest-box__total-result" onClick={goToSearchPage}>
        {t('FILTER_LABEL_SEE_ALL_RESULTS')(totalResultCount)}
        <Icon symbol="chevron-right" />
      </div>
    </div>
  )
}

export default AutosuggestBox
