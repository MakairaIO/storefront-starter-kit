import { Component } from 'react'
import FilterButton from './FilterButton'
import FilterResetButton from './FilterResetButton'
import Sorter from './Sorter'
import List from './List'
import { CartModal, ErrorModal, ProductListFilter } from '..'
import {
  getNumberOfActiveFilters,
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
  scrollTo,
} from '../../utils'

class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobileFilterVisible: false,
      isLoading: false,
      showErrorModal: false,
      showSuccessModal: false,
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

  handleAddToCart = async (id) => {
    this.setState({ loadingProduct: id })

    const success = await this.props.addToCart({ id })

    this.setState({
      showErrorModal: !success,
      showSuccessModal: success,
      loadingProduct: null,
    })
  }

  handleModalClose = () => {
    this.setState({ showErrorModal: false, showSuccessModal: false })
  }

  render() {
    const {
      products = [],
      aggregations = {},
      resetAllFilters,
      queryParams = {},
      totalProductCount = 0,
      isBundle = false,
      addToBundle,
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
            isBundle={isBundle}
            addToBundle={addToBundle}
            isLoading={this.state.isLoading}
            addToCart={this.handleAddToCart}
            loadingProduct={this.state.loadingProduct}
          />
        </div>

        <CartModal
          isVisible={this.state.showSuccessModal}
          closeModal={this.handleModalClose}
        />
        <ErrorModal
          isVisible={this.state.showErrorModal}
          closeModal={this.handleModalClose}
        />
      </section>
    )
  }
}

export default ProductList
export { default as productListVariants } from './variants.js'
