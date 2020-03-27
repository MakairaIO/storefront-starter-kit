import { Component } from 'react'
import FilterButton from './FilterButton'
import FilterResetButton from './FilterResetButton'
import Sorter from './Sorter'
import Pagination from './Pagination'
import ProductTile from './ProductTile'
import { ProductListFilter } from '../..'
import {
  getNumberOfActiveFilters,
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
} from '../../../utils'

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

  submitFormsAndResetPagination = () => {
    this.props.submitForms({ resetPagination: true })
  }

  render() {
    const {
      products = [],
      aggregations = {},
      submitForms,
      resetAllFilters,
      queryParams = {},
      totalProductCount = 0,
    } = this.props

    const numberOfActiveFilters = getNumberOfActiveFilters({ aggregations })

    return (
      <section className="product-list">
        <div className="product-list__actions">
          <FilterButton
            numberOfActiveFilters={numberOfActiveFilters}
            showMobileFilter={this.showMobileFilter}
          />

          <FilterResetButton
            numberOfActiveFilters={numberOfActiveFilters}
            resetAllFilters={resetAllFilters}
          />

          <Sorter queryParams={queryParams} submitForms={submitForms} />
        </div>

        <div className="product-list__wrapper">
          <ProductListFilter
            aggregations={aggregations}
            numberOfActiveFilters={numberOfActiveFilters}
            totalProductCount={totalProductCount}
            isMobileFilterVisible={this.state.isMobileFilterVisible}
            hideMobileFilter={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of this component take care of everything
            submitForms={this.submitFormsAndResetPagination}
            resetAllFilters={resetAllFilters}
          />

          <div className="product-list__list">
            {products.map((product) => (
              <ProductTile key={product.id} {...product.fields} />
            ))}

            <Pagination
              key={queryParams.offset ?? 0} // reset Pagination to re-run constructor when offset change (e.g. when a filter is clicked)
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
