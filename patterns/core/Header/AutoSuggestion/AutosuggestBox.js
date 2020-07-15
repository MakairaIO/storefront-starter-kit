import ProductList from './ProductList'
import Links from './Links'
import { Button } from '../../../'

function AutosuggestBox(props) {
  const { product = {}, closeSearchPopup, ...rest } = props
  return (
    <div className="autosuggest-box">
      <Button
        variant="icon-only"
        icon="times"
        className="autosuggest-box__close"
        onClick={closeSearchPopup}
      />
      <section className="autosuggest-box__links">
        <Links {...rest}></Links>
      </section>
      <section className="autosuggest-box__products">
        {product.count > 0 && (
          <ProductList products={product.items} count={product.count} />
        )}
      </section>
    </div>
  )
}

export default AutosuggestBox
