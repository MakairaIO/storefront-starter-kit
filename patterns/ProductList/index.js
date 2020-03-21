import { Component } from 'react'
import ProductTile from './ProductTile'
import { Button, ProductListFilter } from '..'
import {
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
} from '../../utils'

class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // rendeMobileFilter: false,
      isMobileFilterVisible: false,
    }
  }

  componentDidMount() {
    window.addEventListener('overlay:clicked', this.hideMobileFilter)
  }

  componentWillUnmount() {
    window.removeEventListener('overlay:clicked', this.hideMobileFilter)
  }

  showMobileFilter = () => {
    dispatchShowOverlayEvent()
    this.setState({ isMobileFilterVisible: true })
  }

  hideMobileFilter = () => {
    this.setState({ isMobileFilterVisible: false })
  }

  render() {
    const { products = [], aggregations = {} } = this.props

    return (
      <section className="product-list">
        <div className="product-list__actions">
          <Button
            className="product-list__filter-button"
            icon="chevron-down"
            onClick={this.showMobileFilter}
          >
            Filter
          </Button>
        </div>

        <div className="product-list__wrapper">
          <ProductListFilter
            aggregations={aggregations}
            isMobileFilterVisible={this.state.isMobileFilterVisible}
            hideMobileFilter={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of this component take care of everything
          />

          <div className="product-list__list">
            {products.map(product => (
              <ProductTile key={product.id} {...product.fields} />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default ProductList
export { default as productListVariants } from './variants.js'
