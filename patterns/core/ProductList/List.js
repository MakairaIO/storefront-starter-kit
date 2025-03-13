import classNames from 'classnames'
import { GTM, useGlobalData } from '../../../utils'
import Banner from './Banner'
import ProductTile from './ProductTile'
import Pagination from './Pagination'
import matomo from '../../../utils/core/tracking/matomo'

export default function List(props) {
  const {
    products = [],
    queryParams = {},
    totalProductCount = 0,
    submitForms,
    isLoading = false,
  } = props

  const { params = {}, searchResult } = useGlobalData()
  const { searchPhrase } = params

  function handleTrackingEvent(productId, position, clickTrackingId) {
    if (!searchResult) return
    GTM.trackEvent({
      event: 'search_click',
      search_term: searchPhrase,
      search_result_position: position,
      search_result_item_id: productId,
    })

    handleTrackGoal(clickTrackingId)
  }

  function handleTrackGoal(id) {
    if (!id) return

    matomo.trackGoal(id)
  }

  const classes = classNames('product-list__list', {
    ['product-list__list--loading']: isLoading,
  })

  return (
    <div className={classes}>
      {products.map((entry, index) => {
        if (entry.isBanner) {
          return <Banner key={`banner.${entry.id}`} {...entry} />
        } else {
          return (
            <ProductTile
              handleTrackingEvent={() =>
                handleTrackingEvent(
                  entry.id,
                  index + 1,
                  entry.fields.mak_paid_placement &&
                    entry.fields.mak_placement_click_tracking_id
                )
              }
              handleTrackGoal={handleTrackGoal}
              key={entry.id}
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
