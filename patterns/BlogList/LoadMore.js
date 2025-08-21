import { Button } from '../index'

export default function LoadMore({ onClickLoadMore }) {
  return (
    <div className="blog-list__load-more">
      <Button variant="primary" onClick={onClickLoadMore}>
        Load More
      </Button>
    </div>
  )
}
