import { Component } from 'react'
import FilterButton from './FilterButton'
import FilterResetButton from './FilterResetButton'
import Sorter from './Sorter'
import List from './List'
import { ProductListFilter } from '..'
import {
  getNumberOfActiveFilters,
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
  scrollTo,
} from '../../utils'

class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = { isMobileFilterVisible: false, isLoading: false }
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

  handleFormSubmit = async (options = {}) => {
    const { resetPagination = false } = options

    this.setState({ isLoading: true })
    await this.props.submitForms({ resetPagination })
    this.setState({ isLoading: false })
  }

  handleFormSubmitWithPaginationReset = () => {
    this.handleFormSubmit({ resetPagination: true })
  }

  handlePagination = () => {
    scrollTo({ id: 'body' })

    this.handleFormSubmit()
  }

  render() {
    const {
      products = [],
      aggregations = {},
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

          <Sorter
            queryParams={queryParams}
            submitForms={this.handleFormSubmit}
          />
        </div>

        <div className="product-list__wrapper">
          <ProductListFilter
            aggregations={aggregations}
            numberOfActiveFilters={numberOfActiveFilters}
            totalProductCount={totalProductCount}
            isMobileFilterVisible={this.state.isMobileFilterVisible}
            hideMobileFilter={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of this component take care of everything
            submitForms={this.handleFormSubmitWithPaginationReset}
            resetAllFilters={resetAllFilters}
          />

          <List
            products={products}
            queryParams={queryParams}
            totalProductCount={totalProductCount}
            submitForms={this.handlePagination}
            isLoading={this.state.isLoading}
          />
        </div>
      </section>
    )
  }
}

export default ProductList
export { default as productListVariants } from './variants.js'
