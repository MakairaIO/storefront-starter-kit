import { useRef } from 'react'
import { useLazyLoading } from '../../../utils'
import ProductTile from './ProductTile'
import Pagination from './Pagination'

export default function List(props) {
  const {
    products = [],
    queryParams = {},
    totalProductCount = 0,
    submitForms,
  } = props
  const listRef = useRef(null)

  useLazyLoading({ ref: listRef, dependency: products })

  return (
    <div ref={listRef} className="product-list__list">
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
  )
}
