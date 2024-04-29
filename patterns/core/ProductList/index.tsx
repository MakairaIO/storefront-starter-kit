import React, { useEffect, useState } from 'react'
import FilterButton from './FilterButton'
import FilterResetButton from './FilterResetButton'
import Sorter from './Sorter'
import List from './List'
import { ProductListFilter } from '../..'
import {
  getNumberOfActiveFilters,
  dispatchOverlayEvent,
  dispatchOverlayClickedEvent,
  scrollTo,
} from '../../../utils'
import EmptySearchResult from '../EmptySearchResult'
import { Product } from '../../../public/assets/type/Product'
import { QueryParams } from '../../../public/assets/type/QueryParams'
import { Aggregation } from '../../../public/assets/type/Aggregation'

type Aggregations = {
  [key: T]: Aggregation
}

type Props = {
  products?: Product[]
  aggregations?: Aggregations
  resetAllFilters: () => void
  queryParams?: QueryParams
  totalProductCount?: number
  showEmptyResultFeedback?: boolean
  submitForms: (options?: { resetPagination?: boolean }) => Promise<void>
}

const ProductList: React.FC<Props> = ({
  products = [],
  aggregations = {},
  resetAllFilters,
  queryParams = {},
  totalProductCount = 0,
  showEmptyResultFeedback = false,
  submitForms,
}) => {
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.addEventListener('overlay:clicked', hideMobileFilter)
    return () => {
      window.removeEventListener('overlay:clicked', hideMobileFilter)
    }
  }, [])

  const showMobileFilter = () => {
    dispatchOverlayEvent('show')
    setIsMobileFilterVisible(true)
  }

  const hideMobileFilter = () => {
    setIsMobileFilterVisible(false)
  }

  const handleFormSubmit = async (
    options: { resetPagination?: boolean } = {}
  ) => {
    const { resetPagination = false } = options
    setIsLoading(true)
    await submitForms({ resetPagination })
    setIsLoading(false)
  }

  const handleFormSubmitWithPaginationReset = () => {
    handleFormSubmit({ resetPagination: true })
  }

  const handlePagination = () => {
    scrollTo({ id: 'body' })
    handleFormSubmit()
  }

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
