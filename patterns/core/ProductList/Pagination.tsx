import React, { useState, useEffect } from 'react'
import { Button } from '../..'
import { useTranslation } from '../../../utils'
import { QueryParams } from '../../../public/assets/type/QueryParams'

type PaginationProps = {
  queryParams?: QueryParams
  totalProductCount?: number
  submitForms: () => void
}

const Pagination: React.FC<PaginationProps> = ({
  queryParams = {},
  totalProductCount = 0,
  submitForms,
}) => {
  const [currentPageNr, setCurrentPageNr] = useState(() => {
    const count =
      queryParams.count ?? parseInt(process.env.PRODUCTS_PER_PAGE || '0', 10)
    const offset = queryParams.offset ?? 0
    return offset / count + 1
  })

  useEffect(() => {
    submitForms()
  }, [currentPageNr])

  const calculateTotalNumberOfPages = (): number => {
    const count =
      queryParams.count ?? parseInt(process.env.PRODUCTS_PER_PAGE || '0', 10)
    return Math.ceil(totalProductCount / count)
  }

  const previousPage = (): void => {
    setCurrentPageNr((prevPage) => prevPage - 1)
  }

  const nextPage = (): void => {
    setCurrentPageNr((prevPage) => prevPage + 1)
  }

  const firstPage = (): void => {
    setCurrentPageNr(1)
  }

  const lastPage = (): void => {
    const lastPage = calculateTotalNumberOfPages()
    setCurrentPageNr(lastPage)
  }

  const totalNrOfPages = calculateTotalNumberOfPages()
  const isFirstPage = currentPageNr === 1
  const isLastPage = currentPageNr === totalNrOfPages
  const canJumpToFirst = currentPageNr > 2
  const canJumpToLast = totalNrOfPages > 2 && currentPageNr < totalNrOfPages - 1

  if (totalNrOfPages === 1) return null

  return (
    <form className="product-list__pagination">
      <input type="hidden" name="pageNumber" value={currentPageNr} />
      <Button
        variant="icon-only"
        icon="chevron-double-left"
        disabled={!canJumpToFirst}
        onClick={firstPage}
      />
      <Button
        variant="icon-only"
        icon="chevron-left"
        disabled={isFirstPage}
        onClick={previousPage}
      />
      <PaginationText
        currentPageNr={currentPageNr}
        totalNrOfPages={totalNrOfPages}
      />
      <Button
        variant="icon-only"
        icon="chevron-right"
        disabled={isLastPage}
        onClick={nextPage}
      />
      <Button
        variant="icon-only"
        icon="chevron-double-right"
        disabled={!canJumpToLast}
        onClick={lastPage}
      />
    </form>
  )
}

type PaginationTextProps = {
  currentPageNr: number
  totalNrOfPages: number
}

const PaginationText: React.FC<PaginationTextProps> = ({
  currentPageNr,
  totalNrOfPages,
}) => {
  const { t } = useTranslation()

  return (
    <span className="product-list__pagination-text">
      {t('PAGINATION')(currentPageNr, totalNrOfPages)}
    </span>
  )
}

export default Pagination
