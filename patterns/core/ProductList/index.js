import { useEffect, useState } from 'react'
import FilterButton from './FilterButton'
import FilterResetButton from './FilterResetButton'
import Sorter from './Sorter'
import List from './List'
import { ProductListFilter } from '../..'
import {
  getNumberOfActiveFilters,
  dispatchShowOverlayEvent,
  dispatchOverlayClickedEvent,
  scrollTo,
} from '../../../utils'
import EmptySearchResult from '../EmptySearchResult'

function ProductList(props) {
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.addEventListener('overlay:clicked', hideMobileFilter)
    return () => {
      window.removeEventListener('overlay:clicked', hideMobileFilter)
    }
  }, [])

  const showMobileFilter = () => {
    dispatchShowOverlayEvent()
    setIsMobileFilterVisible(true)
  }

  const hideMobileFilter = () => {
    setIsMobileFilterVisible(false)
  }

  const handleFormSubmit = async (options = {}) => {
    const { resetPagination = false } = options
    setIsLoading(true)
    await props.submitForms({ resetPagination })
    setIsLoading(false)
  }

  const handleFormSubmitWithPaginationReset = () => {
    handleFormSubmit({ resetPagination: true })
  }

  const handlePagination = () => {
    scrollTo({ id: 'body' })
    handleFormSubmit()
  }

  const {
    products = [],
    aggregations = {},
    resetAllFilters,
    queryParams = {},
    totalProductCount = 0,
    showEmptyResultFeedback = false,
  } = props

  const numberOfActiveFilters = getNumberOfActiveFilters({ aggregations })
  const numberOfFilters = Object.keys(aggregations).length

  return (
    <section className="product-list">
      <div className="product-list__actions">
        {numberOfFilters > 0 && (
          <FilterButton
            numberOfActiveFilters={numberOfActiveFilters}
            showMobileFilter={showMobileFilter}
          />
        )}

        <FilterResetButton
          numberOfActiveFilters={numberOfActiveFilters}
          resetAllFilters={resetAllFilters}
        />

        <Sorter queryParams={queryParams} submitForms={handleFormSubmit} />
      </div>

      {showEmptyResultFeedback && products.length === 0 && (
        <EmptySearchResult />
      )}

      {(showEmptyResultFeedback === false || products.length > 0) && (
        <div className="product-list__wrapper">
          <ProductListFilter
            aggregations={aggregations}
            numberOfActiveFilters={numberOfActiveFilters}
            totalProductCount={totalProductCount}
            isMobileFilterVisible={isMobileFilterVisible}
            hideMobileFilter={dispatchOverlayClickedEvent} // for simplicity, we just simulate a click on the overlay and let the lifecycle of this component take care of everything
            submitForms={handleFormSubmitWithPaginationReset}
            resetAllFilters={resetAllFilters}
          />

          <List
            products={products}
            queryParams={queryParams}
            totalProductCount={totalProductCount}
            submitForms={handlePagination}
            isLoading={isLoading}
          />
        </div>
      )}
    </section>
  )
}

export default ProductList
export { default as productListVariants } from './variants.js'
