import { Component } from 'react'
import { Button } from '..'
import { useTranslation } from '../../utils'

export default class Pagination extends Component {
  constructor(props) {
    super(props)

    const { queryParams = {} } = props
    const count = queryParams.count ?? process.env.PRODUCTS_PER_PAGE
    const offset = queryParams.offset ?? 0
    const currentPageNr = offset / count + 1

    this.state = { currentPageNr }
  }

  calculateTotalNumberOfPages = () => {
    const { queryParams = {}, totalProductCount = 0 } = this.props
    const count = queryParams.count ?? process.env.PRODUCTS_PER_PAGE

    return Math.ceil(totalProductCount / count)
  }

  previousPage = () => {
    this.setState((prevState) => {
      return {
        currentPageNr: prevState.currentPageNr - 1,
      }
    }, this.props.submitForms)
  }

  nextPage = () => {
    this.setState((prevState) => {
      return {
        currentPageNr: prevState.currentPageNr + 1,
      }
    }, this.props.submitForms)
  }

  firstPage = () => {
    this.setState({ currentPageNr: 1 }, this.props.submitForms)
  }

  lastPage = () => {
    const lastPage = this.calculateTotalNumberOfPages()

    this.setState({ currentPageNr: lastPage }, this.props.submitForms)
  }

  render() {
    const { currentPageNr } = this.state
    const totalNrOfPages = this.calculateTotalNumberOfPages()
    const isFirstPage = currentPageNr == 1
    const isLastPage = currentPageNr == totalNrOfPages

    const canJumpToFirst = currentPageNr > 2
    const canJumpToLast =
      totalNrOfPages > 2 && currentPageNr < totalNrOfPages - 1

    if (totalNrOfPages == 1) return null

    return (
      <form className="product-list__pagination">
        <input type="hidden" name="pageNumber" value={currentPageNr} />

        <Button
          variant="icon-only"
          icon="chevron-double-left"
          disabled={!canJumpToFirst}
          onClick={this.firstPage}
        />
        <Button
          variant="icon-only"
          icon="chevron-left"
          disabled={isFirstPage}
          onClick={this.previousPage}
        />

        <PaginationText
          currentPageNr={currentPageNr}
          totalNrOfPages={totalNrOfPages}
        />

        <Button
          variant="icon-only"
          icon="chevron-right"
          disabled={isLastPage}
          onClick={this.nextPage}
        />
        <Button
          variant="icon-only"
          icon="chevron-double-right"
          disabled={!canJumpToLast}
          onClick={this.lastPage}
        />
      </form>
    )
  }
}

function PaginationText(props) {
  const { t } = useTranslation()
  const { currentPageNr, totalNrOfPages } = props

  return (
    <span className="product-list__pagination-text">
      {t('PAGINATION')(currentPageNr, totalNrOfPages)}
    </span>
  )
}
