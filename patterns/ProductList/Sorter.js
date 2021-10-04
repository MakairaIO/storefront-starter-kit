import { Dropdown } from '..'
import { sortOptions, useTranslation } from '../../utils'

export default function Sorter(props) {
  const { t } = useTranslation()
  const { queryParams = {}, submitForms } = props
  const sortBy = queryParams.sortBy ?? sortOptions[0].sortBy
  const order = queryParams.order ?? sortOptions[0].order

  const dropdownOptions = sortOptions.map((o) => {
    return {
      ...o,
      label: t(o.label),
    }
  })

  let currentSorting = dropdownOptions.find(
    (option) => option.sortBy === sortBy && option.order === order
  )

  // Fallback for invalid URLs (legacy bot URLs etc.)
  if (!currentSorting) {
    currentSorting = dropdownOptions[0]
  }

  return (
    <form className="product-list__sorter">
      <Dropdown
        key={currentSorting.value} // Do not remove key! See: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
        id="sorter"
        name="sorting"
        options={dropdownOptions}
        value={currentSorting.value}
        onChange={submitForms}
        anchor="right"
      />
    </form>
  )
}
