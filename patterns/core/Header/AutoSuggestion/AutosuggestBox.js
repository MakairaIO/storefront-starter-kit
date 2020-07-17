import ProductList from './ProductList'
import Links from './Links'
import { Button, Icon } from '../../../'
import { useTranslation } from '../../../../utils'

function AutosuggestBox(props) {
  const {
    product = {},
    category = {},
    links = {},
    manufacturer = {},
    closeSearchPopup,
    goToSearchPage,
  } = props
  const linkList = { category, links, manufacturer }
  const hasLinks = category.count + links.count + manufacturer.count > 0
  const totalResults =
    category.total + links.total + manufacturer.total + product.total
  const { t } = useTranslation()

  return (
    <div className="autosuggest-box">
      <div className="autosuggest-box__wrapper">
        <Button
          variant="icon-only"
          icon="times"
          className="autosuggest-box__close"
          onClick={closeSearchPopup}
        />

        {hasLinks && (
          <section className="autosuggest-box__links">
            <Links {...linkList}></Links>
          </section>
        )}

        {product.count > 0 && (
          <section className="autosuggest-box__products">
            <ProductList products={product.items} count={product.count} />
          </section>
        )}
      </div>
      <hr />
      <div className="autosuggest-box__total-result" onClick={goToSearchPage}>
        {t('FILTER_LABEL_SEE_ALL_RESULTS')(totalResults)}
        <Icon symbol="chevron-right" />
      </div>
    </div>
  )
}

export default AutosuggestBox
