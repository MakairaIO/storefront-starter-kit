import { Component } from 'react'
import ProductTile from './ProductTile'
import { Button, ProductListFilter } from '..'

class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // rendeMobileFilter: false,
      isMobileFilterVisible: false,
    }
  }

  toggleMobileFilter = () => {
    this.setState(prevState => {
      return {
        isMobileFilterVisible: !prevState.isMobileFilterVisible,
      }
    })
  }

  render() {
    const { products = [], aggregations = {} } = this.props

    return (
      <section className="product-list">
        <div className="product-list__actions">
          <Button
            className="product-list__filter-button"
            icon="chevron-down"
            onClick={this.toggleMobileFilter}
          >
            Filter
          </Button>
        </div>

        <ProductListFilter
          aggregations={aggregations}
          isMobileFilterVisible={this.state.isMobileFilterVisible}
          closeMobileFilter={this.toggleMobileFilter}
        />

        <div className="product-list__list">
          {products.map(product => (
            <ProductTile key={product.id} {...product.fields} />
          ))}
        </div>
      </section>
    )
  }
}

export default ProductList
export { default as productListVariants } from './variants.js'
