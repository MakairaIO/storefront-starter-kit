import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button } from '../..'
import { sortOptions, useTranslation } from '../../../utils'

export default function Sorter(props) {
  const { t } = useTranslation()
  const [isExpanded, toggleExpanded] = useState(false)
  const { queryParams = {}, submitForms } = props
  const sortBy = queryParams.sortBy ?? sortOptions[0].sortBy
  const order = queryParams.order ?? sortOptions[0].order

  const currentSorting = sortOptions.find(
    (option) => option.sortBy === sortBy && option.order === order
  )

  function hideWhenClickOutside(event) {
    if (!event.target.closest('.product-list__sorter')) {
      toggleExpanded(false)
    }
  }

  useEffect(function handleClickOutside() {
    window.addEventListener('click', hideWhenClickOutside)

    return function cleanup() {
      window.removeEventListener('click', hideWhenClickOutside)
    }
  })

  function handleChange() {
    toggleExpanded(false)
    submitForms()
  }

  const optionsClasses = classNames('product-list__sort-options', {
    ['product-list__sort-options--visible']: isExpanded,
  })

  return (
    <form className="product-list__sorter">
      <Button icon="chevron-down" onClick={() => toggleExpanded(!isExpanded)}>
        {t(currentSorting.label)}
      </Button>

      <ul className={optionsClasses}>
        {sortOptions.map((option) => (
          <li key={option.value} className="product-list__sort-option">
            <input
              type="radio"
              name="sorting"
              className="product-list__sort-option-input"
              id={option.value}
              value={option.value}
              checked={option.value === currentSorting.value}
              onChange={handleChange}
            />

            <label
              htmlFor={option.value}
              className="product-list__sort-option-label"
            >
              {t(option.label)}
            </label>
          </li>
        ))}
      </ul>
    </form>
  )
}
