import { useRef } from 'react'
import classNames from 'classnames'
import { useLazyLoading } from '../../../utils'
import Banner from './Banner'
import ProductTile from './ProductTile'
import Pagination from './Pagination'

export default function List(props) {
  const {
    products = [],
    queryParams = {},
    totalProductCount = 0,
    submitForms,
    isLoading = false,
    pageData,
  } = props
  const listRef = useRef(null)

  useLazyLoading({ ref: listRef, dependency: products })

  const classes = classNames('product-list__list', {
    ['product-list__list--loading']: isLoading,
  })

  return (
    <div ref={listRef} className={classes}>
      {products.map((entry) => {
        if (entry.isBanner) {
          return <Banner key={`banner.${entry.id}`} {...entry} />
        } else {
          return (
            <ProductTile
              pageData={pageData}
              key={entry.id}
              {...props}
              {...entry.fields}
            />
          )
        }
      })}

      <Pagination
        key={queryParams.offset ?? 0} // reset Pagination to re-run constructor when offset change (e.g. when a filter is clicked)
        queryParams={queryParams}
        totalProductCount={totalProductCount}
        submitForms={submitForms}
      />
    </div>
  )
}
