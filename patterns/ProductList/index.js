import { Component } from 'react'
import FilterButton from './FilterButton'
import Sorter from './Sorter'
import Pagination from './Pagination'
import ProductTile from './ProductTile'
import { ProductListFilter } from '..'
import {
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
} from '../../utils'

class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = { isMobileFilterVisible: false }
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
    const {
      products = [],
      aggregations = {},
      submitForms,
      queryParams = {},
      totalProductCount = 0,
    } = this.props

    return (
      <section className="product-list">
        <div className="product-list__actions">
          <FilterButton
            aggregations={aggregations}
            showMobileFilter={this.showMobileFilter}
          />

          <Sorter queryParams={queryParams} submitForms={submitForms} />
        </div>

        <div className="product-list__wrapper">
          <ProductListFilter
            aggregations={aggregations}
            isMobileFilterVisible={this.state.isMobileFilterVisible}
            hideMobileFilter={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of this component take care of everything
            submitForms={submitForms}
          />

          <div className="product-list__list">
            {products.map(product => (
              <ProductTile key={product.id} {...product.fields} />
            ))}

            <Pagination
              queryParams={queryParams}
              totalProductCount={totalProductCount}
              submitForms={submitForms}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default ProductList
export { default as productListVariants } from './variants.js'
