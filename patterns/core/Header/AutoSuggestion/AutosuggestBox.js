import ProductList from './ProductList'
import Links from './Links'
import { Button } from '../../../'

function AutosuggestBox(props) {
  const {
    product = {},
    category = {},
    links = {},
    manufacturer = {},
    closeSearchPopup,
  } = props
  const linkList = { category, links, manufacturer }
  const hasLinks = category.count + links.count + manufacturer.count > 0

  return (
    <div className="autosuggest-box">
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
  )
}

export default AutosuggestBox
