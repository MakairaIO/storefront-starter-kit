import ProductList from './ProductList'

function AutosuggestBox(props) {
  const { category = {}, links = {}, manufacturer = {}, product = {} } = props
  console.log({ category, links, manufacturer, product })
  return (
    <>
      <ProductList products={product.items} count={product.count} />
    </>
  )
}

export default AutosuggestBox
